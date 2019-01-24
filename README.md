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
## Nginx
To start project with nginx run this command:
```
docker-compose -f docker-compose.yml -f <Gunicorn or uwsgi docker-compose file> \
-f docker-compose.nginx.yml up
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
## How to swagger:
You can connect  this views only by port 81
* A JSON view of API specification at /spec/swagger.json
* A YAML view of API specification at /spec/swagger.yaml
* A swagger-ui view of API specification at /spec/swagger/
* A ReDoc view of API specification at /spec/redoc/
* You can get API specification locally by using command:
```
python ./manage.py generate_swagger swagger.yaml -o
```