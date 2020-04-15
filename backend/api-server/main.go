package main

import (
	"backend/api-server/router"
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	sess, err := session.NewSession(&aws.Config{
		Region:      aws.String("ap-northeast-1"),
		Endpoint:    aws.String(os.Getenv("DYNAMO_ENDPOINT")),
		Credentials: credentials.NewStaticCredentials("dummy", "dummy", "dummy"),
	})
	if err != nil {
		panic(err)
	}

	e := router.InitEcho(sess)

	e.Logger.Fatal(e.Start(":" + port))
}
