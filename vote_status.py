import time

class Status:
    def __init__(self, redis):
        self.redis = redis

    def reset(self, is_getocht = False):
        pipe = self.redis.pipeline()
        pipe.delete("vote")
        pipe.delete("last_time_voted")
        pipe.delete("vote_start_time")
        pipe.delete("vote_participants")
        if (is_getocht):
            pipe.set("last_time_tocht_completed", time.time())
        pipe.execute()
        

    def check_status(self):
        result = self.get_status()
        if result == None:
            return {
                "status": "no_tocht_in_progress"
            }
        elif "last_time_tocht_completed" in result:
            return {
                "status": "proposal_is_getocht"
            }
        elif result["progress_of_tocht"] >= 1:
            self.reset(is_getocht=True)
            return {
                "status": "proposal_is_getocht",
                "details": result
            }
        elif time.time() - result["time_last_vote"] > 7:
            self.reset()
            return {
                "status": "tocht_is_resetted",
                "details": result
            }
        return {
            "status": "tocht_in_progress",
            "details": result
        }

    def get_status(self):
        pipe = self.redis.pipeline()
        pipe.get("last_time_tocht_completed")
        pipe.get("vote")
        pipe.scard("vote_participants")
        pipe.get("total_times_voted")
        pipe.get("last_time_voted")
        pipe.get("vote_start_time")
        result = pipe.execute()
           
        number_of_votes_needed = 75 + 75 * result[2]
        if result[0] != None and time.time() - float(result[0]) < 10:
            return {"last_time_tocht_completed": float(result[0])}
        if not result[1]:
            return None
        status = float(result[1])
        number_of_vote_participants = result[2]
        if number_of_vote_participants == None:
            number_of_vote_participants = 0 
        return {
            "progress_of_tocht": round(min(status / number_of_votes_needed, 1), 3),
            "total_number_of_votes": int(result[3]),
            "time_vote_started": round(float(result[5]), 3),
            "time_last_vote": round(float(result[4]), 3),
            "number_of_vote_participants": int(number_of_vote_participants)
        }