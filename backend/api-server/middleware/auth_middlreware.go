package middleware

import (
	"backend/api-server/controller"
	"backend/api-server/domain/services"
	"errors"
	"net/http"
	"strings"

	cognito "github.com/aws/aws-sdk-go/service/cognitoidentityprovider"
	"github.com/labstack/echo"
)

func AuthMiddleware(auth *cognito.CognitoIdentityProvider) echo.MiddlewareFunc {
	userServices := services.NewUserServices(auth)

	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			authHeader := c.Request().Header.Get("Authorization")
			token, err := getToken(authHeader)
			if err != nil {
				return c.JSON(http.StatusUnauthorized, controller.CreateErrorMessage("signin is reuiered"))
			}

			userID, err := userServices.VerifyUserOnCognito(token)
			if err != nil {
				return c.JSON(http.StatusUnauthorized, controller.CreateErrorMessage("token is invalid"))
			}

			c.Set("userID", *userID)
			return next(c)
		}
	}
}

func getToken(header string) (string, error) {
	bearerToken := strings.Split(header, " ")
	if len(bearerToken) != 2 {
		return "", errors.New("no authorization token found")
	}

	return bearerToken[1], nil
}
