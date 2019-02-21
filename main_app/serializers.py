from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers
from main_app import models
from rest_framework.exceptions import ValidationError


class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Actor
        fields = ('id', 'name')


class RoleSerializer(serializers.ModelSerializer):
    actor_id = serializers.ReadOnlyField(source='actor.id')
    name = serializers.ReadOnlyField(source='actor.name')

    class Meta:
        model = models.Role
        fields = ('actor_id', 'name', 'character_name', 'is_primary')


class MovieListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Movie
        fields = ('id', 'title')


class MovieDetailSerializer(serializers.ModelSerializer):
    actors = RoleSerializer(source='role_set', many=True, read_only=True)
    director = serializers.IntegerField(source='director.id')
    director_name = serializers.CharField(source='director.name')

    class Meta:
        model = models.Movie
        fields = ('id', 'title', 'director', 'director_name', 'actors')
        depth = 1

    def create(self, validated_data):
        try:
            title = validated_data['title']
            director_id = validated_data['director']['id']
            director = models.Director.objects.get(id=director_id)
            movie = models.Movie.objects.create(title=title, director=director)
            if 'actors' in self.initial_data:
                actors = self.initial_data.get('actors')
                for actor in actors:
                    actor_id = actor.get('actor_id')
                    character_name = actor.get('character_name')
                    is_primary = actor.get('is_primary')
                    actor_instance = models.Actor.objects.get(pk=actor_id)
                    models.Role(movie=movie, actor=actor_instance, character_name=character_name, is_primary=is_primary)
            movie.save()
            return movie
        except (models.Director.DoesNotExist, KeyError):
            raise ValidationError()

    def update(self, instance: models.Movie, validated_data):
        try:
            if 'actors' in self.initial_data:

                actors = self.initial_data.get('actors')
                actors_id_list = list(instance.actors.values_list('id', flat=True))
                for actor in actors:
                    actor_id = int(actor.get('actor_id'))
                    actor_instance = models.Actor.objects.get(pk=actor_id)
                    character_name = actor.get('character_name')
                    is_primary = actor.get('is_primary')
                    if actor_id in actors_id_list:
                        role = models.Role.objects.filter(movie=instance, actor=actor_instance)[0]
                        role.character_name = character_name
                        role.is_primary = is_primary
                        i = actors_id_list.index(actor_id)
                        actors_id_list.pop(i)
                        role.save()
                    else:
                        models.Role(actor=actor, movie=instance, character_name=character_name,
                                    is_primary=is_primary).save()
                models.Role.objects.filter(actor_id__in=actors_id_list).delete()
            title = validated_data['title']
            director_id = validated_data['director']['id']
            instance.title = title
            director = models.Director.objects.get(pk=director_id)
            instance.director = director
            instance.save()
            return instance
        except (models.Director.DoesNotExist, KeyError):
            raise ValidationError()


class DirectorDetailSerializer(serializers.ModelSerializer):
    movies = MovieListSerializer(many=True, read_only=True)

    class Meta:
        model = models.Director
        fields = ('id', 'name', 'movies')


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], None,
            validated_data['password'])
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")
