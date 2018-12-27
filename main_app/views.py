from rest_framework import viewsets
from main_app.mixins import LoggingMixin
from main_app import models
from main_app import serializers


class DirectorViewSet(LoggingMixin, viewsets.ModelViewSet):
    queryset = models.Director.objects.all()
    serializer_class = serializers.DirectorSerializer


class ActorViewSet(LoggingMixin, viewsets.ModelViewSet):
    queryset = models.Actor.objects.all()
    serializer_class = serializers.ActorSerializer


class MovieViewSet(LoggingMixin, viewsets.ModelViewSet):
    queryset = models.Movie.objects.all()
    serializer_class = serializers.MovieSerializer
