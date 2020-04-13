package entity

type Tweet struct {
	ID        int    `dynamo:"id,hash" json:"id"`
	Content   string `dynamo:"content" json:"content"`
	TweetType string `dynamo:"tweetType" json:"tweetType"`
	UserID    string `dynamo:"userID" json:"userID"`
	CreatedAt int64  `dynamo:"createdAt" json:"createdAt"`
	// refTweetID string
	// likes      []string
}

type PostTweet struct {
	Content   string `json:"content"`
	TweetType string `json:"tweetType"`
	UserID    string `json:"userID"`
	// RefTweetID string `json:"RefTweetID"`
}
