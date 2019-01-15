from locust import HttpLocust
from locust import TaskSet
from locust import task
import random
import itertools
import os


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
    path = os.path.join("code", "testing_users.txt")
    with open(path, 'r') as f:
        for line in f:
            users.append(tuple(line.split()))
    return users


users_iterator = itertools.cycle(read_users())


class LikeTaskSet(TaskSet):

    def on_start(self):
        self.login()

    def login(self):
        response = self.client.get('/accounts/login')
        csrftoken = response.cookies['csrftoken']
        user = users_iterator.__next__()
        self.client.post("/accounts/login/", {"username": user[0], "password": user[1]},
                         headers={"X-CSRFToken": csrftoken})

    @task
    def like(self):
        i = random.randrange(1, 50)
        self.client.post("/movies/{}/like/".format(i))


class UserLikeLocust(HttpLocust):
    task_set = LikeTaskSet
    min_wait = 5000
    max_wait = 9000
