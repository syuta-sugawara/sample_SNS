package router

import (
	"net/http"
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/guregu/dynamo"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func InitEcho() *echo.Echo {
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

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "ok!!")
	})

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// Users
	UserRouter(e, db)
	TweetRouter(e, db)

	return e
}
