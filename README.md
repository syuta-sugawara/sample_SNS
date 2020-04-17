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

| Container        | Port           |
| ------------- |:-------------:| 
| client      | 3000| 
| Api server      | 1323      | 
| DB | 8000      |  

## Serverless Frameworkを用いたデプロイ方法
1. 一時的セキュリティ認証情報(AWS STS)をTerminalに登録
 * [Perman Federation](https://federation.perman.jp/#/)から認証情報を取得
 * Terminal上でスクリプトを実行
2. Makefileを用いて認証情報をTerminalの環境変数に登録
 `$ make`

### Serverless Frameworkにおけるユーザ参照について
二つの方法がある．
1. `~/.aws/`下にある情報をロードする方法
 * `$ export AWS_SDK_LOAD_CONFIG=0` [default]
 * 一時的セキュリティ認証情報を`.aws/config`と`.aws/credentials`に記述する
  - プロファイル情報をcredentialsファイルに設定するときは、プレフィックスの｀profile｀
	```
	[hoge]
	source_profile = default
	role_arn = arn:aws:iam::123456777654:role/hoge
	region = ap-northeast-1
	```
2. shellの環境変数をロードする方法
 * `$ export AWS_SDK_LOAD_CONFIG=1`
 * `env.sh`は，この方法
