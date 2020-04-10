package controller

import (
	"backend/api-server/model"
	"net/http"

	"github.com/guregu/dynamo"
	"github.com/labstack/echo"
)

type UsersController struct {
	userModel model.UserModel
}

func NewUserController(db *dynamo.DB) UsersController {
	return UsersController{
		userModel: model.NewUserModel(db),
	}
}

// ユーザー情報の取得
func (uc *UsersController) UserIndex(c echo.Context) error {
    user_id := c.Param("userName")    
    uc.userModel.All()
    return c.String(http.StatusOK, "GetUserInfo" + user_id)
}

// フォローの取得
func (uc *UsersController) FollowsIndex(c echo.Context) error {
    user_id := c.Param("userName")
    uc.userModel.All()
    return c.String(http.StatusOK, "GetFollows" + user_id)
}

// フォロワーの取得
func (uc *UsersController) FollowersIndex(c echo.Context) error {
    user_id := c.Param("userName")
    uc.userModel.All()
    return c.String(http.StatusOK, "GetFollowers" + user_id)
}