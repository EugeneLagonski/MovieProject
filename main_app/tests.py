from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.utils import json
from main_app import models
from main_app import serializers


class ActorCreateTest(APITestCase):
    def setUp(self):
        self.valid_actor = {'name': 'Name1'}
        self.invalid_actor = {'name': ''}

    def test_create_valid_actor(self):
        response = self.client.post(
            reverse('actor-list'),
            data=json.dumps(self.valid_actor),
            content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_actor(self):
        response = self.client.post(
            reverse('actor-list'),
            data=json.dumps(self.invalid_actor),
            content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class ActorGetAllTest(APITestCase):
    def setUp(self):
        models.Actor.objects.create(name='Name1')
        models.Actor.objects.create(name='Name2')
        models.Actor.objects.create(name='Name3')
        models.Actor.objects.create(name='Name4')

    def test_get_all_actors(self):
        response = self.client.get(reverse('actor-list'))
        actors = models.Actor.objects.all()
        serializer = serializers.ActorSerializer(actors, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ActorGetSingleTest(APITestCase):
    def setUp(self):
        self.actor1 = models.Actor.objects.create(name='Name1')
        self.actor2 = models.Actor.objects.create(name='Name2')
        self.actor3 = models.Actor.objects.create(name='Name3')
        self.actor4 = models.Actor.objects.create(name='Name4')

    def test_get_valid_single_actor(self):
        response = self.client.get(reverse(
            'actor-detail',
            kwargs={'pk': self.actor3.pk}))
        actor = models.Actor.objects.get(pk=self.actor3.pk)
        serializer = serializers.ActorSerializer(actor)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_single_actor(self):
        response = self.client.get(reverse(
            'actor-detail',
            kwargs={'pk': 42}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class ActorUpdateTest(APITestCase):
    def setUp(self):
        self.actor1 = models.Actor.objects.create(name='Name1')
        self.actor2 = models.Actor.objects.create(name='Name2')
        self.valid_update = {'name': 'NewName'}
        self.invalid_update = {'name': ''}

    def test_valid_update_actor(self):
        response = self.client.put(reverse('actor-detail', kwargs={'pk': self.actor1.pk}),
                                   data=json.dumps(self.valid_update),
                                   content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_update_actor(self):
        response = self.client.put(reverse('actor-detail', kwargs={'pk': self.actor1.pk}),
                                   data=json.dumps(self.invalid_update),
                                   content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class ActorDeleteTest(APITestCase):
    def setUp(self):
        self.actor1 = models.Actor.objects.create(name='Name1')
        self.actor2 = models.Actor.objects.create(name='Name2')

    def test_valid_delete_actor(self):
        response = self.client.delete(reverse(
            'actor-detail',
            kwargs={'pk': self.actor2.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_invalid_delete_actor(self):
        response = self.client.delete(reverse(
            'actor-detail',
            kwargs={'pk': 42}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class DirectorCreateTest(APITestCase):
    def setUp(self):
        self.valid_director = {'name': 'Name1'}
        self.invalid_director = {'name': ''}

    def test_create_valid_director(self):
        response = self.client.post(
            reverse('director-list'),
            data=json.dumps(self.valid_director),
            content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_director(self):
        response = self.client.post(
            reverse('director-list'),
            data=json.dumps(self.invalid_director),
            content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class DirectorGetAllTest(APITestCase):
    def setUp(self):
        models.Director.objects.create(name='Name1')
        models.Director.objects.create(name='Name2')
        models.Director.objects.create(name='Name3')
        models.Director.objects.create(name='Name4')

    def test_get_all_director(self):
        response = self.client.get(reverse('director-list'))
        directors = models.Director.objects.all()
        serializer = serializers.DirectorSerializer(directors, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class DirectorGetSingleTest(APITestCase):
    def setUp(self):
        self.director1 = models.Director.objects.create(name='Name1')
        self.director2 = models.Director.objects.create(name='Name2')
        self.director3 = models.Director.objects.create(name='Name3')
        self.director4 = models.Director.objects.create(name='Name4')

    def test_get_valid_single_director(self):
        response = self.client.get(reverse(
            'director-detail',
            kwargs={'pk': self.director3.pk}))
        director = models.Director.objects.get(pk=self.director3.pk)
        serializer = serializers.DirectorSerializer(director)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_single_director(self):
        response = self.client.get(reverse(
            'director-detail',
            kwargs={'pk': 42}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class DirectorUpdateTest(APITestCase):
    def setUp(self):
        self.director1 = models.Director.objects.create(name='Name1')
        self.director2 = models.Director.objects.create(name='Name2')
        self.valid_update = {'name': 'NewName'}
        self.invalid_update = {'name': ''}

    def test_valid_update_director(self):
        response = self.client.put(reverse('director-detail', kwargs={'pk': self.director1.pk}),
                                   data=json.dumps(self.valid_update),
                                   content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_update_director(self):
        response = self.client.put(reverse('director-detail', kwargs={'pk': self.director1.pk}),
                                   data=json.dumps(self.invalid_update),
                                   content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class DirectorDeleteTest(APITestCase):
    def setUp(self):
        self.director1 = models.Director.objects.create(name='Name1')
        self.director2 = models.Director.objects.create(name='Name2')

    def test_valid_delete_director(self):
        response = self.client.delete(reverse(
            'director-detail',
            kwargs={'pk': self.director2.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_invalid_delete_director(self):
        response = self.client.delete(reverse(
            'director-detail',
            kwargs={'pk': 42}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class MovieCreateTest(APITestCase):
    def setUp(self):
        actor1 = models.Actor.objects.create(name='Actor1')
        actor2 = models.Actor.objects.create(name='Actor2')
        director1 = models.Director.objects.create(name='Director1')
        self.valid_movie = {'title': 'Movie', 'director': director1.pk, 'actors': [actor1.pk, actor2.pk]}
        self.invalid_movie = {'title': 'Movie', 'director': 0, 'actors': [actor1.pk, actor2.pk]}

    def test_create_valid_movie(self):
        response = self.client.post(
            reverse('movie-list'),
            data=json.dumps(self.valid_movie),
            content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_movie(self):
        response = self.client.post(
            reverse('movie-list'),
            data=json.dumps(self.invalid_movie),
            content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class MovieGetAllTest(APITestCase):
    def setUp(self):
        actor1 = models.Actor.objects.create(name='Actor1')
        actor2 = models.Actor.objects.create(name='Actor2')
        actor3 = models.Actor.objects.create(name='Actor3')
        director1 = models.Director.objects.create(name='Director1')
        director2 = models.Director.objects.create(name='Director2')
        movie1 = models.Movie.objects.create(title='Movie1', director=director1)
        movie1.actors.add(actor1.pk, actor2.pk)
        movie2 = models.Movie.objects.create(title='Movie2', director=director2)
        movie2.actors.add(actor3.pk, actor2.pk)

    def test_get_all_movies(self):
        response = self.client.get(reverse('movie-list'))
        movies = models.Movie.objects.all()
        serializer = serializers.MovieSerializer(movies, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class MovieGetSingleTest(APITestCase):
    def setUp(self):
        actor1 = models.Actor.objects.create(name='Actor1')
        actor2 = models.Actor.objects.create(name='Actor2')
        actor3 = models.Actor.objects.create(name='Actor3')
        director1 = models.Director.objects.create(name='Director1')
        director2 = models.Director.objects.create(name='Director2')
        self.movie1 = models.Movie.objects.create(title='Movie1', director=director1)
        self.movie1.actors.add(actor1.pk, actor2.pk)
        self.movie2 = models.Movie.objects.create(title='Movie2', director=director2)
        self.movie2.actors.add(actor3.pk, actor2.pk)

    def test_get_valid_single_movie(self):
        response = self.client.get(reverse(
            'movie-detail',
            kwargs={'pk': self.movie2.pk}))
        movie = models.Movie.objects.get(pk=self.movie2.pk)
        serializer = serializers.MovieSerializer(movie)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_single_movie(self):
        response = self.client.get(reverse(
            'movie-detail',
            kwargs={'pk': 0}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class MovieUpdateTest(APITestCase):
    def setUp(self):
        actor1 = models.Actor.objects.create(name='Actor1')
        actor2 = models.Actor.objects.create(name='Actor2')
        actor3 = models.Actor.objects.create(name='Actor3')
        director1 = models.Director.objects.create(name='Director1')
        director2 = models.Director.objects.create(name='Director2')
        self.movie1 = models.Movie.objects.create(title='Movie1', director=director1)
        self.movie1.actors.add(actor1.pk, actor2.pk)
        self.movie2 = models.Movie.objects.create(title='Movie2', director=director2)
        self.movie2.actors.add(actor3.pk, actor2.pk)
        self.valid_update = {'title': 'NewMovie1', 'director': director2.pk, 'actors': [actor1.pk, actor2.pk]}
        self.invalid_update = {'title': 'NewMovie1', 'director': 0, 'actors': [actor1.pk, actor2.pk]}

    def test_valid_update_movie(self):
        response = self.client.put(reverse('movie-detail', kwargs={'pk': self.movie1.pk}),
                                   data=json.dumps(self.valid_update),
                                   content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_update_movie(self):
        response = self.client.put(reverse('movie-detail', kwargs={'pk': self.movie1.pk}),
                                   data=json.dumps(self.invalid_update),
                                   content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class MovieDeleteTest(APITestCase):
    def setUp(self):
        actor1 = models.Actor.objects.create(name='Actor1')
        actor2 = models.Actor.objects.create(name='Actor2')
        actor3 = models.Actor.objects.create(name='Actor3')
        director1 = models.Director.objects.create(name='Director1')
        director2 = models.Director.objects.create(name='Director2')
        self.movie1 = models.Movie.objects.create(title='Movie1', director=director1)
        self.movie1.actors.add(actor1.pk, actor2.pk)
        self.movie2 = models.Movie.objects.create(title='Movie2', director=director2)
        self.movie2.actors.add(actor3.pk, actor2.pk)

    def test_valid_delete_movie(self):
        response = self.client.delete(reverse(
            'movie-detail',
            kwargs={'pk': self.movie2.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_invalid_delete_movie(self):
        response = self.client.delete(reverse(
            'movie-detail',
            kwargs={'pk': 0}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
