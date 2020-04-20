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
		reftweet := entity.Tweet{}
		refuser := entity.User{}
		if tweet.TweetType != "tweet" {
			if err := tm.tweetTable.Get("id", tweet.RefTweetID).One(&reftweet); err != nil {
				fmt.Println(err)
			}
			if err := tm.userModel.userTable.Get("id", reftweet.UserID).One(&refuser); err != nil {
				fmt.Println(err)
			}
		}

		tweetResp := entity.TweetResp{
			ID:        tweet.ID,
			Content:   tweet.Content,
			TweetType: tweet.TweetType,
			CreatedAt: tweet.CreatedAt,
			User:      user,
			Tweet: entity.RefTweet{
				ID:        reftweet.ID,
				Content:   reftweet.Content,
				TweetType: reftweet.TweetType,
				CreatedAt: reftweet.CreatedAt,
				User:      refuser,
				Likes:     reftweet.Likes,
				Retweets:  reftweet.Retweets,
			},
			Likes:    tweet.Likes,
			Retweets: tweet.Retweets,
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

func (tm *TweetModel) Create(t *entity.PostTweet, userID string) {
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
	if reftweet.TweetType == "retweet" || reftweet.TweetType == "like" {
		tweetID = reftweet.RefTweetID
		if err := tm.tweetTable.Get("id", tweetID).One(reftweet); err != nil {
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
		RefTweetID: tweetID,
	}

	if err := tm.tweetTable.Put(tweet).Run(); err != nil {
		fmt.Println(err)
	}
	return
}
