from django.core.management.base import BaseCommand
from main_app.models import Movie


class Command(BaseCommand):
    help = 'Compares likes counter with number of likes'

    def handle(self, *args, **options):
        movies = Movie.objects.all().order_by('pk')
        for movie in movies:
            number = movie.like_set.count()
            print("pk={}, Number of likes = {}, counter of likes is {}, {}".
                  format(movie.pk, number, movie.likes_counter, 'OK' if number == movie.likes_counter else "FAIL"))
