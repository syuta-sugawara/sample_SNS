package model

import (
	"backend/api-server/domain/entity"
	"fmt"

	cognito "github.com/aws/aws-sdk-go/service/cognitoidentityprovider"
	"github.com/guregu/dynamo"
)

type UserModel struct {
	userTable dynamo.Table
	auth      *cognito.CognitoIdentityProvider
}

func NewUserModel(db *dynamo.DB, auth *cognito.CognitoIdentityProvider) UserModel {
	return UserModel{
		userTable: db.Table("Users"),
		auth:      auth,
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

func (um *UserModel) GetOrCreateDummyUser() string {
	dummyID := "dummy"
	user, err := um.Get(dummyID)
	if err == nil {
		return user.ID
	}
	newUser := entity.User{
		ID:         dummyID,
		ScreenName: "anonymous",
		IconUrl:    "https://pbs.twimg.com/profile_images/1136178449779810304/1e0ghs3t_400x400.jpg",
	}
	if err := um.userTable.Put(newUser).Run(); err != nil {
		fmt.Println(err)
	}
	return dummyID
}

func (um *UserModel) Regist(u *entity.User) {
	user := entity.User{
		ID:         u.ID,
		ScreenName: u.ScreenName,
		IconUrl:    u.IconUrl,
	}
	if err := um.userTable.Put(user).Run(); err != nil {
		fmt.Println(err)
	}
	return
}
