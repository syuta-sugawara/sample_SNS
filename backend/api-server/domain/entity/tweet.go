package entity

type Tweet struct {
	ID        int    `dynamo:"id,hash" json:"id"`
	Content   string `dynamo:"content" json:"content"`
	TweetType string `dynamo:"tweetType" json:"tweetType"`
	// userID     string
	// refTweetID string
	// createdAt  time.Time
	// likes      []string
}

type PostTweet struct {
	Content   string `json:"content"`
	TweetType string `json:"tweetType"`
	// UserID     string `json:"userID"`
	// RefTweetID string `json:"RefTweetID"`
}
