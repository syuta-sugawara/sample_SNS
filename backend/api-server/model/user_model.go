package model

import (
	"backend/api-server/domain/entity"

	"github.com/guregu/dynamo"
)

type UserModel struct {
	db *dynamo.DB
}

func NewUserModel(db *dynamo.DB) UserModel {
	return UserModel{
		db: db,
	}
}

func (um *UserModel) All() *[]entity.User {
	return nil
}
