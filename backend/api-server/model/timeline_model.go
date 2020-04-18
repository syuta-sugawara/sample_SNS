package model

import (
	"backend/api-server/domain/entity"
	"fmt"

	"github.com/guregu/dynamo"
)

type TimelineModel struct {
	timelineTable dynamo.Table
	// クソコードです。すみません。。
	tweetTable dynamo.Table
}

func NewTimelineModel(db *dynamo.DB) TimelineModel {
	return TimelineModel{
		timelineTable: db.Table("Timeline"),
	}
}

func (tm *TimelineModel) Add(t *entity.Tweet, u *entity.User) {
	followeIDs := u.FollowedIDs
	followeIDs = append(followeIDs, u.ID)

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

	if _, err := tm.timelineTable.Batch().Write().Put(tweets...).Run(); err != nil {
		fmt.Println(err.Error())
	}
}

func (tm *TimelineModel) Get(userID string, limit int) (*[]entity.Timeline, error) {
	tl := new([]entity.Timeline)
	if err := tm.timelineTable.Get("userID", userID).Order(false).Limit(int64(limit)).All(tl); err != nil {
		return nil, err
	}

	for i := range *tl {
		(*tl)[i].Likes = tm.getLikeCount((*tl)[i].ID)
	}

	return tl, nil
}

// クソコードですみません。。
func (tm *TimelineModel) getLikeCount(id int) int {
	// t := tm.Get(id)
	// count := len(t.Likes)

	// return count

	// TODO: Likeが完成したら実装
	return 10
}
