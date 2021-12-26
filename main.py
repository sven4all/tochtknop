from typing import Optional, Awaitable, List
from fastapi import FastAPI, Request, WebSocket, WebSocketDisconnect
from fastapi.routing import run_endpoint_function
from fastapi.middleware.cors import CORSMiddleware
import vote
import vote_status
import redis
import connection_manager
import time
import asyncio

origins = [
    "http://localhost:3000",
    "http://localhost:8080",
]


r = redis.Redis(host='localhost', port=6379, db=0)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

voteInstance = vote.Vote(r)
statusInstance = vote_status.Status(r)

manager = connection_manager.ConnectionManager()

@app.get("/vote", status_code=204)
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

@app.get("/reset")
def reset():
    # reset
    r.set("vote", 0)

class BackgroundRunner:
    def __init__(self, manager):
        self.manager = manager

    async def run_forever(self):
        while True:
            await asyncio.sleep(0.1)
            result = statusInstance.check_status()
            await manager.broadcast(result)

runner = BackgroundRunner(manager)

@app.on_event('startup')
async def app_startup():
    asyncio.create_task(runner.run_forever())
