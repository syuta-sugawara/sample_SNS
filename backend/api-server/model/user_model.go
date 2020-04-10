package model

import (
	"20fresh_o/backend/domain/entity"

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
