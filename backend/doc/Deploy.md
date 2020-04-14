### Serfverless Framework(Local)で設計した設定ファイルに基づいてAWS上にリソースをDeploy方法
#### やりたいこと
Serverless Frameworkを用いて，AWSにリソースをデプロイしたい．

#### Issue
今回，研修で使用できるIAMユーザ(Security Token Service, STS)は通常ユーザとは違い，
デフォルトの設定では認証に失敗する．

---
#### Perman Federationの一時キーをローカルホストに保存
* [Ref](https://federation.perman.jp/#/login?redirect=%2F)
* ログイン後の出力されるスクリプトをターミナル上で実行

#### リモート上に新規のAssumeRole用ロールを作成する
> 以降は，すでにロールは作成されているため再作成は不要
> Role情報：developer
登録フローは，[ref](https://ca20-exd.slack.com/archives/C0114JT88G5/p1586418751387700?thread_ts=1586418322.386000&cid=C0114JT88G5)

#### 認証情報をローカルの環境変数に登録
`$ aws sts assume-role --role-arn "arn:aws:iam::961937407909:role/deployer" --role-session-name "test"`
上記コマンドの出力情報に基づいて，下記変数に登録する．

```
export AWS_ACCESS_KEY_ID=
export AWS_SECRET_ACCESS_KEY=
export AWS_SESSION_TOKEN=
export AWS_SDK_LOAD_CONFIG=1
```

#### ローカル上のawsのコンフィグファイルを修正

```~/.aws/config
[profile test]
role_arn = arn:aws:iam::xxxxxxxxxx:role/deployer
region = ap-northeast-1
source_profile = default
```
##### `.aws/credentiol`

```~/.aws/credentials
[test]
aws_access_key_id=XXXXXXXXXXXXXXXXXX
aws_secret_access_key=XXXXXXXXXXXXXXXX
[default]
aws_access_key_id = XXXXXXXXXXXXXXXXXXXXXX
aws_secret_access_key = xxxxxxxxxxxxxxxxxxxxxxx
aws_session_token = xxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### serfverless.ymlにprofileを登録
> 登録済みのため省略

#### デプロイ
* アカウントを指定してデプロイ : `$ sls deploy --aws-profile test`
 - `sls` : serverlessの短縮系
  ``````
