from typing import Optional
from fastapi import FastAPI
import vote
import vote_status
import redis

r = redis.Redis(host='localhost', port=6379, db=0)

app = FastAPI()
voteInstance = vote.Vote(r)
statusInstance = vote_status.Status(r)


@app.get("/vote")
def cast_vote(opinion: Optional[bool]):
    result = voteInstance.process_vote(opinion)
    return {"status": result}

@app.get("/status")
def status():
    result = statusInstance.get_status()
    return {"progress_of_tocht": result}

@app.get("/reset")
def reset():
    # reset
    r.set("vote", 0)