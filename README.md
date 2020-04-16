# 20fresh_o

## 起動方法

```shell
$ export DYNAMO_URL=http://localhost:8000
$ docker-compose up
```

[localshot:1323](localshot:1323)で API が立ち上がる。

## db の作成

```shell
$ make create/tables
```

## golang 用.env ファイルの作成（サーバー開発用）

```shell
$ make create/env
```

```
DYNAMO_ENDPOINT=http://localhost:8000
CLIENT_ID=XXXXXXXXX
POOL_ID=XXXXXXXXX
```

`CLIENT_ID`を AWS の Cognito の User Pool より取得
