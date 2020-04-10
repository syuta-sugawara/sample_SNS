package entity

import "time"

type Tweet struct {
	id         string
	content    string
	tweetType  int
	userID     string
	refTweetID string
	createdAt  time.Time
	likes      []string
}
