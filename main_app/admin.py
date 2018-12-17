from django.contrib import admin
from main_app import models

# Register your models here.
admin.site.register(models.Director)
admin.site.register(models.Actor)
admin.site.register(models.Movie)
