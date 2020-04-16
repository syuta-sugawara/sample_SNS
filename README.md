# 20fresh_o

## getting started(client and backend)
 
### before you start

1. set environment variables for client in `./client/.env`

```

API_URL_DEV=http://localhost:1323
API_URL_PROD=https://ztgvzmy5r1.execute-api.ap-northeast-1.amazonaws.com/dev

```

2. set environment variables for backend

```
$ export DYNAMO_URL=http://localhost:8000
```

3. start container

```
$ docker-compose up --build
```

4. create db

```shell
$ cd backend
$ make create/tables
```

## ports

| Item        | port           |
| ------------- |:-------------:| 
| client      | 3000| 
| Api server      | 1323      | 
| DB | 8000      |  