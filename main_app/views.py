from django.core.exceptions import PermissionDenied
from django.http.response import JsonResponse
from rest_framework import viewsets
from main_app.mixins import LoggingMixin
from main_app import models
from main_app import serializers


class DirectorViewSet(LoggingMixin, viewsets.ModelViewSet):
    queryset = models.Director.objects.all()
    serializer_class = serializers.DirectorDetailSerializer


class ActorViewSet(LoggingMixin, viewsets.ModelViewSet):
    queryset = models.Actor.objects.all()
    serializer_class = serializers.ActorSerializer


class MovieViewSet(LoggingMixin, viewsets.ModelViewSet):
    queryset = models.Movie.objects.all()
    serializer_class = serializers.MovieDetailSerializer
    list_serializer_class = serializers.MovieListSerializer

    def get_serializer_class(self):
        if self.action == 'list':
            if hasattr(self, 'list_serializer_class'):
                return self.list_serializer_class
        return super().get_serializer_class()


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
