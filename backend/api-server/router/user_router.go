package router

import (
	"backend/api-server/controller"

	cognito "github.com/aws/aws-sdk-go/service/cognitoidentityprovider"
	"github.com/guregu/dynamo"
	"github.com/labstack/echo"
)

func UserRouter(e *echo.Echo, db *dynamo.DB, auth *cognito.CognitoIdentityProvider) {
	userController := controller.NewUserController(db, auth)
	r := e.Group("/users")
	r.POST("", userController.RegisterUser)
	// r.GET("/:userName", userController.UserIndex)
	// r.GET("/:userName/follows", userController.FollowsIndex)
	// r.GET("/:userName/followers", userController.FollowersIndex)
	// r.PUT("/:userName", userController.UpdateUser)
	// r.POST("/:userName/follow", userController.Follow)
	// r.DELETE("/:userName/follow", userController.Unfollow)
}
