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


class RoleSerializer(serializers.ModelSerializer):
    actor_id = serializers.IntegerField(source='actor.id')
    name = serializers.CharField(source='actor.name')

    class Meta:
        model = models.Role
        fields = ('actor_id', 'name', 'character_name', 'primary')


class MovieSerializer(serializers.ModelSerializer):
    actors = RoleSerializer(source='role_set', many=True)

    class Meta:
        model = models.Movie
        fields = ('id', 'title', 'director', 'actors')
