package controller

import (
	"backend/api-server/domain/entity"
	"backend/api-server/domain/services"
	"backend/api-server/model"
	"net/http"

	cognito "github.com/aws/aws-sdk-go/service/cognitoidentityprovider"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/guregu/dynamo"
	"github.com/labstack/echo"
)

type UsersController struct {
	userModel   model.UserModel
	tweetModel  model.TweetModel
	userService services.UserServices
}

func NewUserController(db *dynamo.DB, auth *cognito.CognitoIdentityProvider, upload *s3manager.Uploader) UsersController {
	return UsersController{
		userModel:   model.NewUserModel(db, auth, upload),
		tweetModel:  model.NewTweetModel(db, auth, upload),
		userService: services.NewUserServices(auth),
	}
}

// ユーザー情報の取得
func (uc *UsersController) GetCurrentUser(c echo.Context) error {
	userID := c.Get("userID").(string)
	user, _ := uc.userModel.Get(userID)

	return c.JSON(http.StatusOK, user)
}

// ユーザー情報の取得
func (uc *UsersController) Get(c echo.Context) error {
	userID := c.Param("userID")
	user, _ := uc.userModel.Get(userID)

	return c.JSON(http.StatusOK, user)
}

func (uc *UsersController) GetUserTL(c echo.Context) error {
	userID := c.Param("userID")
	user, err := uc.userModel.Get(userID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, CreateErrorMessage(err.Error()))
	}

	tweets := uc.tweetModel.UserTL(userID)
	for i := range *tweets {
		(*tweets)[i].User = *user
	}

	return c.JSON(http.StatusOK, tweets)
}

func (uc *UsersController) GetLikeTweets(c echo.Context) error {
	userID := c.Param("userID")
	tweets, err := uc.tweetModel.UserLikes(userID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, CreateErrorMessage(err.Error()))
	}
	return c.JSON(http.StatusOK, tweets)
}

// フォローの取得
func (uc *UsersController) FollowsIndex(c echo.Context) error {
	userID := c.Param("userName")
	uc.userModel.All()
	return c.String(http.StatusOK, "GetFollows"+userID)
}

// フォロワーの取得
func (uc *UsersController) FollowersIndex(c echo.Context) error {
	userID := c.Param("userName")
	uc.userModel.All()
	return c.String(http.StatusOK, "GetFollowers"+userID)
}

// ユーザー情報更新
func (uc *UsersController) UpdateUser(c echo.Context) error {
	userInfo, err := uc.userModel.Update(c)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, CreateErrorMessage(err.Error()))
	}
	return c.JSON(http.StatusOK, userInfo)
}

// ユーザー登録
func (uc *UsersController) RegisterUser(c echo.Context) error {
	u := new(entity.SignUpUser)
	c.Bind(u)

	if err := uc.userService.CreateUserOnCognito(u); err != nil {
		return c.JSON(http.StatusBadRequest, CreateErrorMessage(err.Error()))
	}

	resp := uc.userModel.Regist(u)

	//	credential := &entity.SignInUser{
	//		ID:       u.ID,
	//		PassWord: u.PassWord,
	//	}

	// 	accessToken, err := uc.userService.GetUserFromCognito(credential)

	//	if err != nil {
	//		return c.JSON(http.StatusUnauthorized, CreateErrorMessage(err.Error()))
	//	}
	//
	//	resp := entity.SignInResp{
	// 	Token: *accessToken,
	// }

	// return c.JSON(http.StatusOK, resp)
	return c.JSON(http.StatusCreated, resp)
}

// フォロー処理
func (uc *UsersController) Follow(c echo.Context) error {
	followedUserID := c.Param("followedUserID")
	userID := c.Get("userID").(string)
	followUserInfo := uc.userModel.Follow(c, userID, followedUserID)
	return c.JSON(http.StatusOK, followUserInfo)
}

// アンフォロー処理
func (uc *UsersController) Unfollow(c echo.Context) error {
	followedUserID := c.Param("followedUserID")
	userID := c.Get("userID").(string)
	followUserInfo := uc.userModel.UnFollow(c, userID, followedUserID)
	return c.JSON(http.StatusOK, followUserInfo)
}

// サインイン処理
func (uc *UsersController) Signin(c echo.Context) error {
	u := new(entity.SignInUser)
	c.Bind(u)
	credentials, err := uc.userService.GetToken(u)

	if err != nil {
		return c.JSON(http.StatusUnauthorized, CreateErrorMessage(err.Error()))
	}

	resp := entity.SignInResp{
		Token:        credentials.AccessToken,
		RefreshToken: *credentials.RefreshToken,
	}

	return c.JSON(http.StatusOK, resp)
}

func (uc *UsersController) Refresh(c echo.Context) error {
	req := new(entity.RefreshTokenReq)
	c.Bind(req)
	credentials, err := uc.userService.GetTokenWtihRefreshToken(req.RefreshToken)

	if err != nil {
		return c.JSON(http.StatusUnauthorized, CreateErrorMessage(err.Error()))
	}

	resp := entity.RefreshTokenResp{
		Token: credentials.AccessToken,
	}

	return c.JSON(http.StatusOK, resp)
}
