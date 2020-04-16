# 20fresh_o

## getting started(client and backend)
 
### befor you start

1. set environment variables for client in ./client/.env

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
