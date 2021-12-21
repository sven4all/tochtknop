import time

class Vote:
    def __init__(self, redis):
        self.redis = redis
        self.vote_redis = None


    def process_vote(self, opinion):
        if opinion:
            return self.yes_vote()
        return self.no_vote()

    def yes_vote(self):
        lua_script = """ 
            if redis.call("EXISTS", "vote_start_time") == 0 then
                redis.call("SET", "vote_start_time", ARGV[1])
            end

            local vote_start_time = tonumber(redis.call("GET", "vote_start_time"))
            local delta_time = ARGV[1] - vote_start_time
            local vote_value = 1 + 0.0000717774 * delta_time^1.6
            if delta_time > 600 then
                vote_value = 3
            end
            return redis.call("INCRBYFLOAT", "vote", vote_value)
            """
        if self.vote_redis == None:
            self.vote_redis = self.redis.register_script(lua_script)
       
        return self.vote_redis(args=[time.time()])

    def no_vote(self):
        return self.redis.incrbyfloat("vote", -1)
