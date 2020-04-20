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
			ID:         t.ID,
			Content:    t.Content,
			TweetType:  t.TweetType,
			CreatedAt:  t.CreatedAt,
			UserID:     followedIDs[i],
			RefTweetID: t.RefTweetID,
			RefTweet:   t.RefTweet,
			User:       *u,
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

func (tm *TimelineModel) UpdateLike(tweetID int) {
	tweets := new([]entity.TweetResp)

	tm.timelineTable.Get("id", tweetID).Index("sortByTweetID").All(tweets)
	if len(*tweets) > 0 {
		t := incrementLikeCount(tweets)
		tm.bulkInsert(t)
	}

	tweets = new([]entity.TweetResp)
	tm.timelineTable.Get("refTweetID", tweetID).Index("sortByRefTweetID").All(tweets)
	if len(*tweets) > 0 {
		t := incrementRefLikeCount(tweets)
		tm.bulkInsert(t)
	}
}

func (tm *TimelineModel) bulkInsert(tweets []interface{}) {
	if _, err := tm.timelineTable.Batch().Write().Put(tweets...).Run(); err != nil {
		fmt.Println(err.Error())
	}
}

func incrementLikeCount(tweets *[]entity.TweetResp) []interface{} {
	var t []interface{}
	for i := range *tweets {
		(*tweets)[i].LikeCount++
		t = append(t, (*tweets)[i])
	}

	return t
}

func incrementRefLikeCount(tweets *[]entity.TweetResp) []interface{} {
	var t []interface{}
	j, _ := json.Marshal(tweets)
	fmt.Println(string(j))
	for i := range *tweets {
		(*tweets)[i].RefTweet.LikeCount++
		t = append(t, (*tweets)[i])
	}

	return t
}
