package router

import (
	"backend/api-server/controller"
	"backend/api-server/middleware"

	cognito "github.com/aws/aws-sdk-go/service/cognitoidentityprovider"
	"github.com/guregu/dynamo"
	"github.com/labstack/echo"
)

func UserRouter(e *echo.Echo, db *dynamo.DB, auth *cognito.CognitoIdentityProvider) {
	userController := controller.NewUserController(db, auth)

	// 認証なしのrouting
	router := e.Group("/users")
	router.POST("", userController.RegisterUser)
	router.POST("/signin", userController.Signin)

	// 認証ありのrouting
	router.Use(middleware.AuthMiddleware(auth))
	router.GET("", userController.Get)
	// r.GET("/:userName", userController.UserIndex)
	// r.GET("/:userName/follows", userController.FollowsIndex)
	// r.GET("/:userName/followers", userController.FollowersIndex)
	// r.PUT("/:userName", userController.UpdateUser)
	// r.POST("/:userName/follow", userController.Follow)
	// r.DELETE("/:userName/follow", userController.Unfollow)
}
