package model

import (
	"20fresh_o/backend/domain/entity"
)

type TweetModel struct {
	db string
}

func NewTweetModel(db string) TweetModel {
	return TweetModel{
		db: db,
	}
}

func (tm *TweetModel) All() *[]entity.Tweet {
	return nil
}
