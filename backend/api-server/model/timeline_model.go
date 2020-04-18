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

func (tt *TimelineModel) Add(t *entity.Tweet, u *entity.User) {
	followeIDs := u.FollowedIDs

	if len(followeIDs) == 0 {
		return
	}

	var tweets []interface{}

	for i := range followeIDs {
		tweet := entity.Timeline{
			ID:        t.ID,
			Content:   t.Content,
			TweetType: t.TweetType,
			CreatedAt: t.CreatedAt,
			UserID:    followeIDs[i],
			User:      *u,
		}

		tweets = append(tweets, tweet)
	}

	if _, err := tt.timelineTable.Batch().Write().Put(tweets...).Run(); err != nil {
		fmt.Println(err.Error())
	}
}
