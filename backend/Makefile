create/tweet:
	aws dynamodb create-table --cli-input-json file://./dynamodb/schema/create_tweets_table.json --endpoint-url http://localhost:8000

create/user:
	aws dynamodb create-table --cli-input-json file://./dynamodb/schema/create_users_table.json --endpoint-url http://localhost:8000

create/tables:
	make create/tweet
	make create/user
