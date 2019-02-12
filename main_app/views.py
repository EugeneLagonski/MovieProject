from django.core.exceptions import PermissionDenied
from django.http.response import JsonResponse
from knox.models import AuthToken
from rest_framework import viewsets, generics
from rest_framework.response import Response

from main_app.mixins import LoggingMixin
from main_app import models
from main_app import serializers
from main_app.serializers import CreateUserSerializer, UserSerializer, LoginUserSerializer


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


class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })


