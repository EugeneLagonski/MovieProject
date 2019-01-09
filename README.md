Movie Project
=======
## Starting
To start project run this command:
```
sudo docker-compose up
```
## Generate data
To fill database with random data run this command:
```
python3 ./manage.py generate_data <actor_count> <director_count> <movie_count>
```
## Gunicorn and uwsgi
* To start project with Gunicorn run this command:
```
docker-compose -f docker-compose.yml -f docker-compose.gunicorn.yml up
```
* To start project with uwsgi run this command:
```
docker-compose -f docker-compose.yml -f docker-compose.uwsgi.yml up
```