package model

import (
	"backend/api-server/domain/entity"
	"crypto/rand"
	"encoding/binary"
	"fmt"
	"strconv"

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

func (um *UserModel) Get(id string) *entity.User {
	user := new(entity.User)
	if id == "" {
		fmt.Println("NonName")
		id = CreateDummyUser()
		fmt.Println(id)
		user.ID = id
		um.Regist(user)
	}
	if err := um.userTable.Get("id", id).One(user); err != nil {
		fmt.Println(err)
	}
	return user
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

func CreateDummyUser() string {
	var n uint64
	binary.Read(rand.Reader, binary.LittleEndian, &n)
	return strconv.FormatUint(n, 36)
}
