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
	authRouter := e.Group("/auth")
	authRouter.POST("/signup", userController.RegisterUser)
	authRouter.POST("/signin", userController.Signin)

	// 認証ありのrouting
	userRouter := e.Group("/user")
	userRouter.Use(middleware.AuthMiddleware(auth))
	userRouter.GET("", userController.Get)
	// r.GET("/:userName", userController.UserIndex)
	// r.GET("/:userName/follows", userController.FollowsIndex)
	// r.GET("/:userName/followers", userController.FollowersIndex)
	// r.PUT("/:userName", userController.UpdateUser)
	// r.POST("/:userName/follow", userController.Follow)
	// r.DELETE("/:userName/follow", userController.Unfollow)
	userRouter.POST("/signout", userController.Signout)
}
