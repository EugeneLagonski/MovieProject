from django.urls import path, include
from main_app import views
from rest_framework import routers
from django.views.decorators.csrf import csrf_exempt

router = routers.DefaultRouter()
router.register('directors', views.DirectorViewSet)
router.register('actors', views.ActorViewSet)
router.register('movies', views.MovieViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('movies/<pk>/like/', csrf_exempt(views.like)),
    path('auth/register/', views.RegistrationAPI.as_view()),
    path('auth/login/', views.LoginAPI.as_view()),
]
