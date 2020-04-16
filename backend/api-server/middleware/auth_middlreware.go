package middleware

import (
	"backend/api-server/controller"
	"backend/api-server/domain/services"
	"net/http"

	cognito "github.com/aws/aws-sdk-go/service/cognitoidentityprovider"
	"github.com/labstack/echo"
)

func AuthMiddleware(auth *cognito.CognitoIdentityProvider) echo.MiddlewareFunc {
	userServices := services.NewUserServices(auth)

	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			token, err := c.Cookie("token")
			if err != nil {
				return c.JSON(http.StatusUnauthorized, controller.CreateErrorMessage("signin is reuiered"))
			}

			userID, err := userServices.VerifyUserOnCognito(token.Value)
			if err != nil {
				return c.JSON(http.StatusUnauthorized, controller.CreateErrorMessage("token is invalid"))
			}

			c.Set("userID", *userID)
			return next(c)
		}
	}
}
