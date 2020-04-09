package model

import (
	"backend/api-server/domain/entity"

	"github.com/guregu/dynamo"
)

type TweetModel struct {
	db *dynamo.DB
}

func NewTweetModel(db *dynamo.DB) TweetModel {
	return TweetModel{
		db: db,
	}
}

func (tm *TweetModel) All() *[]entity.Tweet {
	return nil
}
