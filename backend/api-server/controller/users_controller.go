package controller

import (
	"20fresh_o/backend/model"
	"net/http"

	"github.com/guregu/dynamo"
	"github.com/labstack/echo"
)

type UsersController struct {
	tweetModel model.TweetModel
}

func NewUserController(db *dynamo.DB) UsersController {
	return UsersController{
		userModel: model.NewUsersModel(db),
	}
}

func (uc *UsersController) UserIndex(c echo.Context) error {
	uc.userModel.All()
	return c.String(http.StatusOK, "OK!")
}
