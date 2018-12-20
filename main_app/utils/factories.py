import factory
from main_app import models


class ActorFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Actor

    name = factory.Faker('name')


class DirectorFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Director

    name = factory.Faker('name')


class RoleFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Role

    character_name = factory.Faker('name')
    primary = factory.Faker('pybool')


class MovieFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Movie

    title = factory.Faker('sentence', nb_words=3, variable_nb_words=True)
    director = factory.Iterator(models.Director.objects.all())

    @factory.post_generation
    def actors(self, create, extracted, **kwargs):
        if create:
            import random
            roles_count = random.randint(1, models.Actor.objects.count())
            actors = models.Actor.objects.order_by('?')[:roles_count]
            for actor in actors:
                RoleFactory(actor=actor, movie=self)
