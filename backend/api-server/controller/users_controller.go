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

// ユーザー情報更新
func (uc *UsersController) UpdateUser(c echo.Context) error {
    user_id := c.Param("userName")
    uc.userModel.All()
    return c.String(http.StatusOK, "GetFollowers" + user_id)
}

// ユーザー登録
func (uc *UsersController) RegisterUser(c echo.Context) error {
    uc.userModel.All()
    return c.String(http.StatusOK, "RegisterUser")
}

// フォロー処理
func (uc *UsersController) Follow(c echo.Context) error {
    user_id := c.Param("userName")
    uc.userModel.All()
    return c.String(http.StatusOK, "Follow" + user_id)
}

// アンフォロー処理
func (uc *UsersController) Unfollow(c echo.Context) error {
    user_id := c.Param("userName")
    uc.userModel.All()
    return c.String(http.StatusOK, "Unfollow" + user_id)
}