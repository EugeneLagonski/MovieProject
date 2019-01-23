import factory
import faker

from main_app import models
import random
from django.contrib.auth import get_user_model


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
    is_primary = factory.Faker('pybool')


def lazy_func():
    fake = faker.Faker()
    return fake.random_element(elements=models.Director.objects.all())


class MovieFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Movie

    title = factory.Faker('sentence', nb_words=3, variable_nb_words=True)

    director = factory.LazyFunction(lazy_func)

    @factory.post_generation
    def actors(self, create, extracted, **kwargs):
        if create:
            roles_count = random.randint(1, models.Actor.objects.count())
            actors = models.Actor.objects.order_by('?')[:roles_count]
            for actor in actors:
                RoleFactory(actor=actor, movie=self)


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = get_user_model()

    username = factory.Faker('user_name')
    password = factory.Faker('password', length=10, digits=True, upper_case=True, lower_case=True)

    @classmethod
    def _create(cls, model_class, *args, **kwargs):
        password = kwargs['password']
        username = kwargs['username']
        with open('testing_users.txt', 'a') as f:
            f.write('{} {}\n'.format(username, password))
        instance = super()._create(model_class, *args, **kwargs)
        instance.set_password(password)
        instance.save()
        return instance
