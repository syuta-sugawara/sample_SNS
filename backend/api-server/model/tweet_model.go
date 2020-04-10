package model

import (
	"backend/api-server/domain/entity"
	"fmt"

	"github.com/guregu/dynamo"
)

type TweetModel struct {
	tweetTable dynamo.Table
}

func NewTweetModel(db *dynamo.DB) TweetModel {
	return TweetModel{
		tweetTable: db.Table("Tweets"),
	}
}

func (tm *TweetModel) All() *[]entity.Tweet {
	tweet := new([]entity.Tweet)
	if err := tm.tweetTable.Get("id", "hogehoge").One(); err != nil {
		fmt.Println(err)
	}

	return tweet
}
