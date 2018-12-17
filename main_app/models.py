from django.db import models
from main_app import mixins


class Director(mixins.Timestamps):
    name = models.CharField(max_length=80)

    def __str__(self):
        return self.name


class Actor(mixins.Timestamps):
    name = models.CharField(max_length=80)

    def __str__(self):
        return self.name


class Movie(mixins.Timestamps):
    title = models.CharField(max_length=80)
    director = models.ForeignKey(Director, on_delete=models.CASCADE, related_name='movies')
    actors = models.ManyToManyField(Actor)

    def __str__(self):
        return self.title
