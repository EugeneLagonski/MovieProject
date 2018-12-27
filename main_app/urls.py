from django.urls import path, include
from main_app import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('directors', views.DirectorViewSet)
router.register('actors', views.ActorViewSet)
router.register('movies', views.MovieViewSet)

urlpatterns = [
    path('', include(router.urls))
]
