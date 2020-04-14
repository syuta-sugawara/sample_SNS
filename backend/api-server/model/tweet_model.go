package model

import (
	"backend/api-server/domain/entity"
	"fmt"
	"time"

	"github.com/guregu/dynamo"
)

type TweetModel struct {
	tweetTable dynamo.Table
	seqModel   SequenceModel
	userModel  UserModel
}

func NewTweetModel(db *dynamo.DB) TweetModel {
	return TweetModel{
		tweetTable: db.Table("Tweets"),
		seqModel:   NewSequenceModel(db),
		userModel:  NewUserModel(db),
	}
}

func (tm *TweetModel) All() *[]entity.Tweet {
	tweet := new([]entity.Tweet)
	if err := tm.tweetTable.Scan().All(tweet); err != nil {
		fmt.Println(err)
	}

	return tweet
}

func (tm *TweetModel) Get(id string) *entity.Tweet {
	tweet := new(entity.Tweet)
	if err := tm.tweetTable.Get("id", id).One(tweet); err != nil {
		fmt.Println(err)
	}
	return tweet
}

func (tm *TweetModel) Create(t *entity.PostTweet) {
	cid := tm.seqModel.NextID("tweets")
	fmt.Println("0")
	userID := tm.userModel.GetOrCreateDummyUser()
	tweet := entity.Tweet{
		ID:        cid,
		Content:   t.Content,
		TweetType: t.TweetType,
		UserID:    userID,
		CreatedAt: time.Now().Unix(),
	}

	if err := tm.tweetTable.Put(tweet).Run(); err != nil {
		fmt.Println(err)
	}

	return
}
