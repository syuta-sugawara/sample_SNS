package model

import (
	"backend/api-server/domain/entity"
	"encoding/json"
	"fmt"

	"github.com/guregu/dynamo"
)

type TimelineModel struct {
	timelineTable dynamo.Table
}

func NewTimelineModel(db *dynamo.DB) TimelineModel {
	return TimelineModel{
		timelineTable: db.Table("Timeline"),
	}
}

func (tm *TimelineModel) Add(t *entity.Tweet, u *entity.User) {
	followedIDs := u.FollowedIDs
	followedIDs = append(followedIDs, u.ID)

	if len(followedIDs) == 0 {
		return
	}

	var tweets []interface{}

	for i := range followedIDs {
		tweet := entity.TweetResp{
			ID:           t.ID,
			Content:      t.Content,
			TweetType:    t.TweetType,
			CreatedAt:    t.CreatedAt,
			UserID:       followedIDs[i],
			RefTweetID:   t.RefTweetID,
			RefTweet:     t.RefTweet,
			User:         *u,
			LikeUsers:    t.LikeUsers,
			RetweetUsers: t.RetweetUsers,
		}

		tweets = append(tweets, tweet)
	}

	tm.bulkInsert(tweets)
}

func (tm *TimelineModel) Get(userID string, limit int) (*[]entity.TweetResp, error) {
	tl := new([]entity.TweetResp)
	if err := tm.timelineTable.Get("userID", userID).Order(false).Limit(int64(limit)).All(tl); err != nil {
		return nil, err
	}

	return tl, nil
}

func (tm *TimelineModel) UpdateLike(tweetID int, userID string) {
	tweets := tm.getTweets(tweetID, "id", "sortByTweetID")
	if len(*tweets) > 0 {
		t := incrementLike(tweets, userID)
		tm.bulkInsert(t)
	}

	tweets = tm.getTweets(tweetID, "refTweetID", "sortByRefTweetID")
	if len(*tweets) > 0 {
		t := incrementRefLike(tweets, userID)
		tm.bulkInsert(t)
	}
}

func (tm *TimelineModel) UpdateRetweet(tweetID int, userID string) {
	tweets := tm.getTweets(tweetID, "id", "sortByTweetID")
	if len(*tweets) > 0 {
		t := incrementRetweet(tweets, userID)
		tm.bulkInsert(t)
	}

	tweets = tm.getTweets(tweetID, "refTweetID", "sortByRefTweetID")
	if len(*tweets) > 0 {
		t := incrementRefRetweet(tweets, userID)
		tm.bulkInsert(t)
	}
}

func (tm *TimelineModel) getTweets(tweetID int, col string, index string) *[]entity.TweetResp {
	tweets := new([]entity.TweetResp)
	tm.timelineTable.Get(col, tweetID).Index(index).All(tweets)
	return tweets
}

func (tm *TimelineModel) bulkInsert(tweets []interface{}) {
	if _, err := tm.timelineTable.Batch().Write().Put(tweets...).Run(); err != nil {
		fmt.Println(err.Error())
	}
}

func incrementLike(tweets *[]entity.TweetResp, userID string) []interface{} {
	var t []interface{}
	for i := range *tweets {
		(*tweets)[i].LikeCount++
		(*tweets)[i].LikeUsers = append((*tweets)[i].LikeUsers, userID)
		t = append(t, (*tweets)[i])
	}

	return t
}

func incrementRefLike(tweets *[]entity.TweetResp, userID string) []interface{} {
	var t []interface{}
	j, _ := json.Marshal(tweets)
	fmt.Println(string(j))
	for i := range *tweets {
		(*tweets)[i].RefTweet.LikeCount++
		(*tweets)[i].LikeUsers = append((*tweets)[i].LikeUsers, userID)
		t = append(t, (*tweets)[i])
	}

	return t
}

func incrementRetweet(tweets *[]entity.TweetResp, userID string) []interface{} {
	var t []interface{}
	j, _ := json.Marshal(tweets)
	fmt.Println(string(j))
	for i := range *tweets {
		(*tweets)[i].RetweetCount++
		(*tweets)[i].RetweetUsers = append((*tweets)[i].RetweetUsers, userID)
		t = append(t, (*tweets)[i])
	}

	return t
}

func incrementRefRetweet(tweets *[]entity.TweetResp, userID string) []interface{} {
	var t []interface{}

	for i := range *tweets {
		(*tweets)[i].RefTweet.RetweetCount++
		(*tweets)[i].RetweetUsers = append((*tweets)[i].RetweetUsers, userID)
		t = append(t, (*tweets)[i])
	}

	return t
}
