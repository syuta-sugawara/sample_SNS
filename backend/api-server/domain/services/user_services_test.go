package services

import (
	"testing"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/cognitoidentityprovider"
	"github.com/joho/godotenv"
)

func TestCreateUserOnCognito(t *testing.T) {
	godotenv.Load("../../.env")

	auth := cognitoidentityprovider.New(session.New(), &aws.Config{Region: aws.String("ap-northeast-1")})
	us := NewUserServices(auth)

	us.CreateUserOnCognito("DragonTaro", "draogn.taro.lioil@gmail.com", "hogehoge1")
	t.Fail()
}

func TestGetUserFromCognito(t *testing.T) {
	godotenv.Load("../../.env")

	auth := cognitoidentityprovider.New(session.New(), &aws.Config{Region: aws.String("ap-northeast-1")})
	us := NewUserServices(auth)

	us.GetUserFromCognito("DragonTaro", "hogehoge1")
	t.Fail()
}

func TestVerifyUserOnCognito(t *testing.T) {
	godotenv.Load("../../.env")

	auth := cognitoidentityprovider.New(session.New(), &aws.Config{Region: aws.String("ap-northeast-1")})
	us := NewUserServices(auth)

	accessToken, _ := us.GetUserFromCognito("DragonTaro", "hogehoge1")
	us.VerifyUserOnCognito(*accessToken)
	t.Fail()
}
