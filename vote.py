import time
from fastapi import HTTPException

class Vote:
    def __init__(self, redis):
        self.redis = redis
        self.yes_vote_redis = None
        self.no_vote_redis = None


    def process_vote(self, opinion, ip):
        if opinion:
            return self.yes_vote(ip)
        return self.no_vote(ip)

    def yes_vote(self, ip):
        lua_script = """ 
            if redis.call("EXISTS", "last_time_tocht_completed") == 1 and tonumber(ARGV[1]) - tonumber(redis.call("GET", "last_time_tocht_completed")) < 10 then
                return false
            end
 
            if redis.call("EXISTS", "vote_start_time") == 0 then
                redis.call("SET", "vote_start_time", ARGV[1])
            end

            local vote_start_time = tonumber(redis.call("GET", "vote_start_time"))
            local delta_time = ARGV[1] - vote_start_time
            local vote_value = 1 + 0.0000225 * delta_time^2
            if vote_value >= 5 then
                vote_value = 5
            end
            redis.call("SET", "last_time_voted", ARGV[1])
            redis.call("INCR", "total_times_voted")
            redis.call("SADD", "vote_participants", ARGV[2])
            redis.call("INCRBYFLOAT", "vote", vote_value)
            return true
            """
        if self.yes_vote_redis == None:
            self.yes_vote_redis = self.redis.register_script(lua_script)
        result = self.yes_vote_redis(args=[time.time(), ip])
        print(result)
        if result != True: 
            raise HTTPException(status_code=422, detail="Vote can't be started at this moment, wait for 10s.")

    def no_vote(self, ip):
        lua_script = """
            if redis.call("EXISTS", "vote_start_time") == 0 then
                return "Tocht not started yet."
            end
            redis.call("INCR", "total_times_voted")
            redis.call("SET", "last_time_voted", ARGV[1])
            redis.call("SADD", "vote_participants", ARGV[2])
            if tonumber(redis.call("GET", "vote")) < 1 then
                return "Vote is < 1. You can't decrease the vote below 0."
            end
            redis.call("INCRBYFLOAT", "vote", -1)
        """
        if self.no_vote_redis == None:
            self.no_vote_redis = self.redis.register_script(lua_script)
        
        result = self.no_vote_redis(args=[time.time(), ip])
        if result != None:
            raise HTTPException(status_code=422, detail=result.decode())
