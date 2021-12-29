from typing import Optional, Awaitable, List
from fastapi import FastAPI, Request, WebSocket, WebSocketDisconnect, Depends
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

import vote
import vote_status
import redis
import connection_manager
import aioredis
import asyncio

origins = [
    "http://localhost:3000",
    "http://localhost:8080",
]


r = redis.Redis(host='localhost', port=6379, db=0)

limiter = Limiter(key_func=get_remote_address)
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

voteInstance = vote.Vote(r)
statusInstance = vote_status.Status(r)

manager = connection_manager.ConnectionManager()

@app.get("/vote", status_code=204)
@limiter.limit("100 / 10 second")
@limiter.limit("15 / second")
def cast_vote(opinion: Optional[bool], request: Request):
    ip = request.client.host
    voteInstance.process_vote(opinion, ip)
    return

@app.get("/status")
def status():
    result = statusInstance.check_status()
    return result

@app.websocket("/status/ws")
async def status(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"Client # left the chat")

class BackgroundRunner:
    def __init__(self, manager):
        self.manager = manager

    async def run_forever(self):
        while True:
            try:
                print("sleep")
                await asyncio.sleep(0.1)
                print("check_status")
                result = statusInstance.check_status()
                print("broadcast message")
                await manager.broadcast(result)
            except Exception as e:
                print("there was something wrong")
                print(e)

runner = BackgroundRunner(manager)

@app.on_event('startup')
async def app_startup():
    asyncio.create_task(runner.run_forever())
    

