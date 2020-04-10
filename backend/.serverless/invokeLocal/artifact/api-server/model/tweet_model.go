package model

import (
	"20fresh_o/backend/domain/entity"

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
