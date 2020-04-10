create/tweet:
	aws dynamodb create-table --cli-input-json file://./dynamodb/schema/create_tweets_table.json --endpoint-url http://localhost:8000

create/user:
	aws dynamodb create-table --cli-input-json file://./dynamodb/schema/create_users_table.json --endpoint-url http://localhost:8000

create/tables:
	make create/tweet
	make create/user

add-tweet:
	aws dynamodb put-item --table-name Tweets \
	--item '{"id": {"S": "hogehoge"}, "content": {"S": "ツイート"}, "tweetType": {"S": "tweet"}}' \
	--endpoint-url http://localhost:8000