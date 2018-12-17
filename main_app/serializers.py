from rest_framework import serializers
from main_app import models


class DirectorSerializer(serializers.HyperlinkedModelSerializer):
    movies = serializers.HyperlinkedIdentityField(
        many=True,
        read_only=True,
        view_name='movie-detail',
    )

    class Meta:
        model = models.Director
        fields = ('id', 'name', 'movies')


class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Actor
        fields = ('id', 'name')


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Movie
        fields = ('id', 'title', 'director', 'actors')
