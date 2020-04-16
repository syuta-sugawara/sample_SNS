package router

import (
	"net/http"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/cognitoidentityprovider"
	"github.com/guregu/dynamo"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func InitEcho(sess *session.Session) *echo.Echo {
	db := dynamo.New(sess)
	auth := cognitoidentityprovider.New(session.New(), &aws.Config{Region: aws.String("ap-northeast-1")})

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
	UserRouter(e, db, auth)
	TweetRouter(e, db, auth)

	return e
}
