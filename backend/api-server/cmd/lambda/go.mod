module cmd/lambda

go 1.14

require (
	backend/api-server v0.0.0
	github.com/aws/aws-lambda-go v1.16.0
	github.com/aws/aws-sdk-go v1.30.7
	github.com/awslabs/aws-lambda-go-api-proxy v0.6.0
)

replace backend/api-server => ../../
