package entity

type Tweet struct {
	ID        string `dynamo:"id,hash" json:"id"`
	Content   string `dynamo:"content" json:"content"`
	TweetType string `dynamo:"tweetType" json:"tweetType"`
	// userID     string
	// refTweetID string
	// createdAt  time.Time
	// likes      []string
}

type PostTweet struct {
	content    string
	tweetType  int
	userID     string
	refTweetID string
}
