package main

import (
	"backend/api-server/router"
	"context"
	"net/http"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	echolamda "github.com/awslabs/aws-lambda-go-api-proxy/echo"
	"github.com/guregu/dynamo"
	"github.com/joho/godotenv"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

var echoLambda *echolamda.EchoLambda

func initEcho() *echo.Echo {
	sess, err := session.NewSession(&aws.Config{
		Region:      aws.String("ap-northeast-1"),
		Endpoint:    aws.String(os.Getenv("DYNAMO_ENDPOINT")),
		Credentials: credentials.NewStaticCredentials("dummy", "dummy", "dummy"),
	})

	if err != nil {
		panic(err)
	}

	db := dynamo.New(sess)

	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete, http.MethodOptions},
	}))

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// Users
	router.UserRouter(e, db)
	router.TweetRouter(e, db)

	return e
}

func init() {
	e := initEcho()
	echoLambda = echolamda.New(e)
}

func Handler(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	return echoLambda.ProxyWithContext(ctx, req)
}

func Start() {
	lambda.Start(Handler)
}

func main() {
	godotenv.Load()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	e := initEcho()

	e.Logger.Fatal(e.Start(":" + port))
}
