package model

import (
	"backend/api-server/domain/entity"

	"github.com/guregu/dynamo"
)

type UserModel struct {
	userTable dynamo.Table
}

func NewUserModel(db *dynamo.DB) UserModel {
	return UserModel{
		userTable: db.Table("Users"),
	}
}

func (um *UserModel) All() *[]entity.User {
	return nil
}

func (tm *TweetModel) Create(tw entity.PostTweet) {

}
