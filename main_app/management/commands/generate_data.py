from django.core.management.base import BaseCommand
from main_app import models
from main_app.utils import factories


class Command(BaseCommand):
    help = 'Fills database with generated data'

    def add_arguments(self, parser):
        parser.add_argument('actors_count', type=int, help='Indicates the number of actors to be created')
        parser.add_argument('directors_count', type=int, help='Indicates the number of directors to be created')
        parser.add_argument('movies_count', type=int, help='Indicates the number of movies to be created')

    @staticmethod
    def clean_up():
        models.Role.objects.all().delete()
        models.Movie.objects.all().delete()
        models.Actor.objects.all().delete()
        models.Director.objects.all().delete()

    def handle(self, *args, **options):
        self.clean_up()
        factories.ActorFactory.create_batch(options['actors_count'])
        factories.DirectorFactory.create_batch(options['directors_count'])
        factories.MovieFactory.create_batch(options['movies_count'])
