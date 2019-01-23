from django.core.exceptions import PermissionDenied
from django.http.response import JsonResponse
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from main_app.mixins import LoggingMixin
from main_app import models
from main_app import serializers


class DirectorViewSet(LoggingMixin, viewsets.ModelViewSet):
    queryset = models.Director.objects.all()
    serializer_class = serializers.DirectorSerializer


class ActorViewSet(LoggingMixin, viewsets.ModelViewSet):
    queryset = models.Actor.objects.all()
    serializer_class = serializers.ActorSerializer

    @action(methods=['get'], detail=True, name='actor-movies')
    def movies(self, request, pk=None):
        try:
            actor = models.Actor.objects.get(pk=pk)
        except models.Actor.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = serializers.ActorMoviesSerializer(actor, context={'request': request})
        return Response(serializer.data)


class MovieViewSet(LoggingMixin, viewsets.ModelViewSet):
    queryset = models.Movie.objects.all()
    serializer_class = serializers.MovieSerializer


def like(request, pk=None):
    if request.method == "POST":
        user = request.user
        if user.is_authenticated:
            movie = models.Movie.objects.get(pk=pk)
            try:
                models.Like.objects.get(movie=movie, user=user)
            except models.Like.DoesNotExist:
                like = models.Like(user=user, movie=movie)
                like.save()
                movie.likes_counter += 1
                movie.save()
            return JsonResponse({'likes_count': movie.likes_counter})
        raise PermissionDenied
