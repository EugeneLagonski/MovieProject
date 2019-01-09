import multiprocessing


bind = '0.0.0.0:8000'
backlog = 2048

workers = multiprocessing.cpu_count() * 2 + 1
timeout = 30
