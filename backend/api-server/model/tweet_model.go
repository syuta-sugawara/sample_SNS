package model

import (
	"backend/api-server/domain/entity"
	"backend/api-server/utils"
	"fmt"
	"sort"

	cognito "github.com/aws/aws-sdk-go/service/cognitoidentityprovider"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/guregu/dynamo"
)

type TweetModel struct {
	tweetTable dynamo.Table
	seqModel   SequenceModel
	userModel  UserModel
	tlModel    TimelineModel
}

func NewTweetModel(db *dynamo.DB, auth *cognito.CognitoIdentityProvider, upload *s3manager.Uploader) TweetModel {
	return TweetModel{
		tweetTable: db.Table("Tweets"),
		seqModel:   NewSequenceModel(db),
		userModel:  NewUserModel(db, auth, upload),
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
		User:      *u,
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

func (tm *TweetModel) Retweet(tweetID int, u *entity.User) (*entity.RespCount, error) {
	cid := tm.seqModel.NextID("tweets")
	refTweet := new(entity.Tweet)
	if err := tm.tweetTable.Get("id", tweetID).One(refTweet); err != nil {
		fmt.Println(err)
		return nil, err
	}
	reftweetID := &tweetID
	if refTweet.TweetType == "retweet" || refTweet.TweetType == "like" {
		reftweetID = refTweet.RefTweetID
		if err := tm.tweetTable.Get("id", tweetID).One(refTweet); err != nil {
			fmt.Println(err)
			return nil, err
		}
	}
	refTweet.RetweetCount++
	refTweet.RetweetUsers = append(refTweet.RetweetUsers, u.ID)
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
		return nil, err
	}

	resp := &entity.RespCount{
		Message: "Retweet success",
		Count:   refTweet.RetweetCount,
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
	go tm.tlModel.UpdateRetweet(*reftweetID, u.ID)

	return resp, nil
}

func (tm *TweetModel) Like(tweetID int, userID string) (*entity.RespCount, error) {
	err := tm.addLikeList(tweetID, userID)
	if err != nil {
		return nil, err
	}

	refTweet := new(entity.Tweet)
	if err := tm.tweetTable.Get("id", tweetID).One(refTweet); err != nil {
		fmt.Println(err)
		return nil, err
	}
	reftweetID := &tweetID
	if refTweet.TweetType == "retweet" || refTweet.TweetType == "like" {
		reftweetID = refTweet.RefTweetID
		if err := tm.tweetTable.Get("id", reftweetID).One(refTweet); err != nil {
			fmt.Println(err)
			return nil, err
		}
	}

	refTweet.LikeCount++
	refTweet.LikeUsers = append(refTweet.LikeUsers, userID)
	tm.Update(refTweet)

	go tm.tlModel.UpdateLike(*reftweetID, userID)
	resp := &entity.RespCount{
		Message: "Like success",
		Count:   refTweet.LikeCount,
	}

	return resp, nil
}

func (tm *TweetModel) UserTL(userID string) *[]entity.TweetResp {
	tweet := new([]entity.TweetResp)
	tm.tweetTable.Get("userID", userID).Index("userID").Limit(int64(20)).Order(false).All(tweet)

	return tweet
}

func (tm *TweetModel) addLikeList(tweetID int, userID string) error {
	userInfo, err := tm.userModel.Get(userID)
	if err != nil {
		return err
	}
	userInfo.LikeList = append(userInfo.LikeList, tweetID)
	if err := tm.userModel.userTable.Put(userInfo).Run(); err != nil {
		return err
	}
	return nil
}

func (tm *TweetModel) UserLikes(userID string) (*[]entity.TweetResp, error) {
	userInfo, err := tm.userModel.Get(userID)
	if err != nil {
		return nil, err
	}
	tweets := []entity.TweetResp{}
	tweetResp := new(entity.TweetResp)
	sort.Sort(sort.Reverse(sort.IntSlice(userInfo.LikeList)))
	for i := range userInfo.LikeList {
		tm.tweetTable.Get("id", userInfo.LikeList[i]).One(tweetResp)
		tweets = append(tweets, *tweetResp)
	}
	return &tweets, nil
}
