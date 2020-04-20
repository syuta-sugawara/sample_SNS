package model

import (
	"backend/api-server/domain/entity"
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

	if _, err := tm.timelineTable.Batch().Write().Put(tweets...).Run(); err != nil {
		fmt.Println(err.Error())
	}
}

func (tm *TimelineModel) Get(userID string, limit int) (*[]entity.TweetResp, error) {
	tl := new([]entity.TweetResp)
	if err := tm.timelineTable.Get("userID", userID).Order(false).Limit(int64(limit)).All(tl); err != nil {
		return nil, err
	}

	return tl, nil
}
