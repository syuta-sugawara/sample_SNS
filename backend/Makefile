create/tweet:
	aws dynamodb create-table --cli-input-json file://./dynamodb/schema/create_tweets_table.json --endpoint-url http://localhost:8000

create/user:
	aws dynamodb create-table --cli-input-json file://./dynamodb/schema/create_users_table.json --endpoint-url http://localhost:8000

create/sequence:
	aws dynamodb create-table --cli-input-json file://./dynamodb/schema/create_sequences_table.json --endpoint-url http://localhost:8000

create/tables:
	make create/tweet
	make create/user
	make create/sequence

add-tweet:
	aws dynamodb put-item --table-name Tweets \
	--item '{"id": {"N": "1"}, "content": {"S": "ツイート"}, "tweetType": {"S": "tweet"}}' \
	--endpoint-url http://localhost:8000

add-seq:
	aws dynamodb put-item --table-name Sequences \
	--item '{"table": {"S": "tweets"}, "currentNumber": {"N": "1"}}' \
	--endpoint-url http://localhost:8000

add-test:
	make add-tweet
	make add-seq