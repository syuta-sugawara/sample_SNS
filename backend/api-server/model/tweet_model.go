package model

import (
	"backend/api-server/domain/entity"
	"backend/api-server/utils"
	"fmt"

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

func (tm *TweetModel) Create(t *entity.PostTweet, u *entity.User) {
	cid := tm.seqModel.NextID("tweets")
	tweet := entity.Tweet{
		ID:        cid,
		Content:   t.Content,
		TweetType: t.TweetType,
		UserID:    u.ID,
		CreatedAt: utils.GetNowMillsec(),
	}

	if err := tm.tweetTable.Put(tweet).Run(); err != nil {
		fmt.Println(err)
	}

	go tm.tlModel.Add(&tweet, u)

	return
}

func (tm *TweetModel) Update(t *entity.Tweet) {
	if err := tm.tweetTable.Put(t).Run(); err != nil {
		fmt.Println(err)
	}
	return
}

func (tm *TweetModel) Retweet(tweetID int, u *entity.User) {
	cid := tm.seqModel.NextID("tweets")
	refTweet := new(entity.Tweet)
	if err := tm.tweetTable.Get("id", tweetID).One(refTweet); err != nil {
		fmt.Println(err)
	}
	reftweetID := &tweetID
	if refTweet.TweetType == "retweet" || refTweet.TweetType == "like" {
		reftweetID = refTweet.RefTweetID
		if err := tm.tweetTable.Get("id", tweetID).One(refTweet); err != nil {
			fmt.Println(err)
		}
	}
	refTweet.RetweetCount++
	tm.Update(refTweet)
	refTweet.RefTweet = nil

	tweet := entity.Tweet{
		ID:         cid,
		TweetType:  "retweet",
		UserID:     u.ID,
		CreatedAt:  utils.GetNowMillsec(),
		RefTweetID: reftweetID,
		RefTweet:   refTweet,
	}

	if err := tm.tweetTable.Put(&tweet).Run(); err != nil {
		fmt.Println(err)
	}

	refTweet.RetweetCount--
	tweet = entity.Tweet{
		ID:         cid,
		TweetType:  "retweet",
		UserID:     u.ID,
		CreatedAt:  utils.GetNowMillsec(),
		RefTweetID: reftweetID,
		RefTweet:   refTweet,
	}

	go tm.tlModel.Add(&tweet, u)
	go tm.tlModel.UpdateRetweetCount(*reftweetID)

	return
}

func (tm *TweetModel) Like(tweetID int, userID string) {
	cid := tm.seqModel.NextID("tweets")
	refTweet := new(entity.Tweet)
	if err := tm.tweetTable.Get("id", tweetID).One(refTweet); err != nil {
		fmt.Println(err)
	}
	reftweetID := &tweetID
	if refTweet.TweetType == "retweet" || refTweet.TweetType == "like" {
		reftweetID = refTweet.RefTweetID
		if err := tm.tweetTable.Get("id", reftweetID).One(refTweet); err != nil {
			fmt.Println(err)
		}
	}

	refTweet.LikeCount++
	tm.Update(refTweet)

	tweet := entity.Tweet{
		ID:         cid,
		TweetType:  "like",
		UserID:     userID,
		CreatedAt:  utils.GetNowMillsec(),
		RefTweetID: reftweetID,
	}

	if err := tm.tweetTable.Put(tweet).Run(); err != nil {
		fmt.Println(err)
	}

	go tm.tlModel.UpdateLikeCount(*reftweetID)
}
