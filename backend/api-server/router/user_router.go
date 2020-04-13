package router

import (
	"backend/api-server/controller"

	"github.com/guregu/dynamo"
	"github.com/labstack/echo"
)

func UserRouter(e *echo.Echo, db *dynamo.DB) {
	userController := controller.NewUserController(db)
	r := e.Group("/users")
	r.GET("/:userName", userController.UserIndex)
	r.GET("/:userName/follows", userController.FollowsIndex)
	r.GET("/:userName/followers", userController.FollowersIndex)
	r.PUT("/:userName", userController.UpdateUser)
	r.POST("/:userName", userController.RegisterUser)
	r.POST("/:userName/follow", userController.Follow)
	r.DELETE("/:userName/follow", userController.Unfollow)
}
