package middleware

import (
	"backend/api-server/domain/services"

	cognito "github.com/aws/aws-sdk-go/service/cognitoidentityprovider"
	"github.com/labstack/echo"
)

func AuthMiddleware(auth *cognito.CognitoIdentityProvider) echo.MiddlewareFunc {
	userServices := services.NewUserServices(auth)

	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			token, _ := c.Cookie("token")
			userID, err := userServices.VerifyUserOnCognito(token.Value)
			if err != nil {
				return err
			}

			c.Set("userID", *userID)

			return next(c)
		}
	}

}
