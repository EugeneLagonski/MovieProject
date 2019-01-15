from locust import HttpLocust
from locust import TaskSet
from locust import task
import random
import itertools


class MyTaskSet(TaskSet):

    @task
    def get_director_list(self):
        self.client.get('/directors')

    @task
    def get_actor_list(self):
        self.client.get('/actors')

    @task
    def get_movie_list(self):
        self.client.get('/movies')

    @task
    def get_single_director(self):
        self.client.get('/directors/{}'.format(random.randrange(21, 41)))

    @task
    def get_single_actor(self):
        self.client.get('/actors/{}'.format(random.randrange(21, 41)))

    @task
    def get_single_movie(self):
        self.client.get('/movies/{}'.format(random.randrange(11, 21)))

    @task
    def get_root(self):
        self.client.get('/')


class GetLocust(HttpLocust):
    task_set = MyTaskSet
    min_wait = 5000
    max_wait = 9000


def read_users():
    users = []
    with open('/code/testing_users.txt', 'r') as f:
        users.append(tuple(f.readline().split()))
    return users


users_iterator = itertools.cycle(read_users())


class LikeTaskSet(TaskSet):

    def on_start(self):
        self.login()

    def login(self):
        user = users_iterator.__next__()
        self.client.post("/accounts/login", {"username": user[0], "password": user[1]})

    @task
    def like(self):
        i = random.randrange(1, 1000)
        self.client.post("/movies/{}/like".format(i))

    def on_stop(self):
        self.logout()

    def logout(self):
        self.client.post("/accounts/logout")


class UserLikeLocust(HttpLocust):
    task_set = LikeTaskSet
    min_wait = 5000
    max_wait = 9000
