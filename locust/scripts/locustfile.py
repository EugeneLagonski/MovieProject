from locust import HttpLocust
from locust import TaskSet
from locust import task
import random


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
