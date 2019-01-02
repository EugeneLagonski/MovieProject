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

## Locust testing
To start the locust server run this command in locust directory:
```
docker-compose up --scale locust-worker=<number of workers>
```
and locust server will be on http://127.0.0.1:8089/