package model

import (
	"backend/api-server/domain/entity"
	"fmt"
	"time"

	cognito "github.com/aws/aws-sdk-go/service/cognitoidentityprovider"
	"github.com/guregu/dynamo"
)

type TweetModel struct {
	tweetTable dynamo.Table
	seqModel   SequenceModel
	userModel  UserModel
	tlModel    TimelineModel
}

func NewTweetModel(db *dynamo.DB, auth *cognito.CognitoIdentityProvider) TweetModel {
	return TweetModel{
		tweetTable: db.Table("Tweets"),
		seqModel:   NewSequenceModel(db),
		userModel:  NewUserModel(db, auth),
		tlModel:    NewTimelineModel(db),
	}
}

func (tm *TweetModel) Get(id int) *entity.Tweet {
	tweet := new(entity.Tweet)
	if err := tm.tweetTable.Get("id", id).One(tweet); err != nil {
		fmt.Println(err)
	}
	return tweet
}

func (tm *TweetModel) Create(t *entity.PostTweet, user *entity.User) {
	cid := tm.seqModel.NextID("tweets")
	tweet := entity.Tweet{
		ID:         cid,
		Content:    t.Content,
		TweetType:  t.TweetType,
		UserID:     userID,
		CreatedAt:  time.Now().Unix(),
		RefTweetID: 0,
		Likes:      0,
		Retweets:   0,
	}

	if err := tm.tweetTable.Put(tweet).Run(); err != nil {
		fmt.Println(err)
	}

	go tm.tlModel.Add(&tweet, user)

	return
}

func (tm *TweetModel) Update(t *entity.Tweet) {
	if err := tm.tweetTable.Put(t).Run(); err != nil {
		fmt.Println(err)
	}
	return
}

func (tm *TweetModel) Retweet(tweetID int, userID string) {
	cid := tm.seqModel.NextID("tweets")
	reftweet := new(entity.Tweet)
	if err := tm.tweetTable.Get("id", tweetID).One(reftweet); err != nil {
		fmt.Println(err)
	}
	if reftweet.TweetType == "retweet" || reftweet.TweetType == "like" {
		tweetID = reftweet.RefTweetID
		if err := tm.tweetTable.Get("id", tweetID).One(reftweet); err != nil {
			fmt.Println(err)
		}
	}
	reftweet.Retweets++
	tm.Update(reftweet)

	tweet := entity.Tweet{
		ID:         cid,
		TweetType:  "retweet",
		UserID:     userID,
		CreatedAt:  time.Now().Unix(),
		RefTweetID: tweetID,
	}

	if err := tm.tweetTable.Put(tweet).Run(); err != nil {
		fmt.Println(err)
	}
	return
}

func (tm *TweetModel) Like(tweetID int, userID string) {
	cid := tm.seqModel.NextID("tweets")
	reftweet := new(entity.Tweet)
	if err := tm.tweetTable.Get("id", tweetID).One(reftweet); err != nil {
		fmt.Println(err)
	}
	reftweetID := tweetID
	if reftweet.TweetType == "retweet" || reftweet.TweetType == "like" {
		reftweetID = reftweet.RefTweetID
		if err := tm.tweetTable.Get("id", reftweetID).One(reftweet); err != nil {
			fmt.Println(err)
		}
	}

	reftweet.Likes++
	tm.Update(reftweet)

	tweet := entity.Tweet{
		ID:         cid,
		TweetType:  "like",
		UserID:     userID,
		CreatedAt:  time.Now().Unix(),
		RefTweetID: reftweetID,
	}

	if err := tm.tweetTable.Put(tweet).Run(); err != nil {
		fmt.Println(err)
	}
	return
}
