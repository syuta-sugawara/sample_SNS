package model

import (
	"backend/api-server/domain/entity"
	"fmt"
	"sort"
	"time"

	cognito "github.com/aws/aws-sdk-go/service/cognitoidentityprovider"
	"github.com/guregu/dynamo"
)

type TweetModel struct {
	tweetTable dynamo.Table
	seqModel   SequenceModel
	userModel  UserModel
}

func NewTweetModel(db *dynamo.DB, auth *cognito.CognitoIdentityProvider) TweetModel {
	return TweetModel{
		tweetTable: db.Table("Tweets"),
		seqModel:   NewSequenceModel(db),
		userModel:  NewUserModel(db, auth),
	}
}

func (tm *TweetModel) All() []entity.TweetResp {
	tweets := []entity.Tweet{}
	tweetsResp := []entity.TweetResp{}
	if err := tm.tweetTable.Scan().All(&tweets); err != nil {
		fmt.Println(err)
	}
	for i := 0; i < len(tweets); i++ {
		tweet := tweets[i]
		user := entity.User{}
		if err := tm.userModel.userTable.Get("id", tweet.UserID).One(&user); err != nil {
			fmt.Println(err)
		}

		tweetResp := entity.TweetResp{
			ID:        tweet.ID,
			Content:   tweet.Content,
			TweetType: tweet.TweetType,
			CreatedAt: tweet.CreatedAt,
			User:      user,
		}
		tweetsResp = append(tweetsResp, tweetResp)
	}
	sort.Slice(tweetsResp, func(i, j int) bool { return tweetsResp[i].CreatedAt > tweetsResp[j].CreatedAt })

	return tweetsResp
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
