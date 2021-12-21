
class Status:
    def __init__(self, redis):
        self.redis = redis

    def get_status(self):
        initial_number_of_votes = 500
        status = self.redis.get("vote")
        if not status:
            return 0
        status = int(status)
        if status <= 0:
            return 0
        return min(status / initial_number_of_votes, 1)