package model

import (
	"backend/api-server/domain/entity"
	"fmt"

	cognito "github.com/aws/aws-sdk-go/service/cognitoidentityprovider"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/guregu/dynamo"
	"github.com/labstack/echo"
)

type UserModel struct {
	userTable dynamo.Table
	auth      *cognito.CognitoIdentityProvider
	upload    *s3manager.Uploader
}

func NewUserModel(db *dynamo.DB, auth *cognito.CognitoIdentityProvider, upload *s3manager.Uploader) UserModel {
	return UserModel{
		userTable: db.Table("Users"),
		auth:      auth,
		upload:    upload,
	}
}

func (um *UserModel) All() *[]entity.User {
	return nil
}

func (um *UserModel) Get(id string) (*entity.User, error) {
	user := new(entity.User)
	if err := um.userTable.Get("id", id).One(user); err != nil {
		fmt.Println(err)
		return user, err
	}
	return user, nil
}

func (um *UserModel) Update(c echo.Context) (*entity.User, error) {
	userID := c.Get("userID").(string)
	screeName := c.FormValue("screenName")
	comment := c.FormValue("comment")
	iconFile, err := c.FormFile("iconImg")
	if err != nil {
		return nil, err
	}
	iconUrl, err := um.UploadImage(iconFile, userID, "iconImg")
	if err != nil {
		return nil, err
	}
	headerFile, err := c.FormFile("headerImg")
	if err != nil {
		return nil, err
	}
	headerUrl, err := um.UploadImage(headerFile, userID, "headerImg")
	if err != nil {
		return nil, err
	}
	user := new(entity.User)
	user = &entity.User{
		ID:         userID,
		ScreenName: screeName,
		Comment:    comment,
		IconUrl:    *iconUrl,
		HeaderUrl:  *headerUrl,
	}
	if err := um.userTable.Put(user).Run(); err != nil {
		return nil, err
	}
	return user, nil
}

func (um *UserModel) Updates(c echo.Context, u *entity.User, fu *entity.User) {
	c.Bind(u)
	if err := um.userTable.Put(u).Run(); err != nil {
		fmt.Println(err)
	}
	c.Bind(fu)
	if err := um.userTable.Put(fu).Run(); err != nil {
		fmt.Println(err)
	}
	return
}
func (um *UserModel) Regist(u *entity.SignUpUser) entity.User {
	user := entity.User{
		ID:         u.ID,
		ScreenName: u.ScreenName,
	}
	if err := um.userTable.Put(user).Run(); err != nil {
		fmt.Println(err)
	}
	return user
}

func (um *UserModel) Follow(c echo.Context, userID string, followedID string) {
	userInfo, followedUserInfo := um.GetUsersInfo(userID, followedID)
	userInfo.FollowIDs = append(userInfo.FollowIDs, followedID)
	followedUserInfo.FollowedIDs = append(followedUserInfo.FollowedIDs, userID)
	um.Updates(c, userInfo, followedUserInfo)
}

func (um *UserModel) UnFollow(c echo.Context, userID string, followedID string) {
	userInfo, followedUserInfo := um.GetUsersInfo(userID, followedID)
	userInfo.FollowIDs = removeUser(userInfo.FollowIDs, followedID)
	followedUserInfo.FollowedIDs = removeUser(followedUserInfo.FollowedIDs, userID)
	um.Updates(c, userInfo, followedUserInfo)
}

func removeUser(userIDList []string, userID string) []string {
	list := []string{}
	for _, v := range userIDList {
		if v == userID {
			continue
		}
		list = append(list, v)
	}
	return list
}

func (um *UserModel) GetUsersInfo(userID string, followedID string) (*entity.User, *entity.User) {
	userInfo := new(entity.User)
	followedUserInfo := new(entity.User)
	if err := um.userTable.Get("id", userID).One(&userInfo); err != nil {
		fmt.Println(err)
	}
	if err := um.userTable.Get("id", followedID).One(&followedUserInfo); err != nil {
		fmt.Println(err)
	}
	return userInfo, followedUserInfo
}
