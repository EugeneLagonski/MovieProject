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
python3 ./manage.py generate_data <actor_count> <director_count> <movie_count> <users count>
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

## Locust testing
To start the locust server run this command in locust directory:
```
docker-compose up --scale locust-worker=<number of workers>
```
and locust server will be on http://127.0.0.1:8089/


## Compare likes counter and real number of likes
To compare likes counter and real number of likes run this command:
```
python3 ./manage.py compare_likes
```