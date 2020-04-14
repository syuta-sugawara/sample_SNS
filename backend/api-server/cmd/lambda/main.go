package main

import (
	"backend/api-server/router"
	"context"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	echolamda "github.com/awslabs/aws-lambda-go-api-proxy/echo"
)

var echoLambda *echolamda.EchoLambda

func init() {
	e := router.InitEcho()
	echoLambda = echolamda.New(e)
}

func Handler(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	return echoLambda.ProxyWithContext(ctx, req)
}

func main() {
	lambda.Start(Handler)
}
