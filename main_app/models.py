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
    actors = models.ManyToManyField(Actor, through='Role', related_name='movies')

    def __str__(self):
        return self.title


class Role(mixins.Timestamps):
    actor = models.ForeignKey(Actor, on_delete=models.DO_NOTHING)
    movie = models.ForeignKey(Movie, on_delete=models.DO_NOTHING)
    character_name = models.CharField(max_length=80)
    primary = models.BooleanField()

    def __str__(self):
        return self.character_name
