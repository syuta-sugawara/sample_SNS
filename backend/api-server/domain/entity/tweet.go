package entity

type Tweet struct {
	ID         int    `dynamo:"id,hash" json:"id"`
	Content    string `dynamo:"content" json:"content"`
	TweetType  string `dynamo:"tweetType" json:"tweetType"`
	UserID     string `dynamo:"userID" json:"userID"`
	CreatedAt  int64  `dynamo:"createdAt" json:"createdAt"`
	RefTweetID int    `dynamo:"refTweetID" json:"refTweetID"`
	// likes      []string
	Retweets int `dynamo:"retweets" json:"retweets"`
}

type PostTweet struct {
	Content   string `json:"content"`
	TweetType string `json:"tweetType"`
	// RefTweetID string `json:"RefTweetID"`
}

type RefTweet struct {
	ID        int    `json:"id"`
	Content   string `json:"content"`
	TweetType string `json:"tweetType"`
	CreatedAt int64  `json:"createdAt"`
	User      User   `json:"user"`
	Retweets  int    `json:"retweets"`
}

type TweetResp struct {
	ID        int      `json:"id"`
	Content   string   `json:"content"`
	TweetType string   `json:"tweetType"`
	CreatedAt int64    `json:"createdAt"`
	User      User     `json:"user"`
	Tweet     RefTweet `json:"refTweet"`
	Retweets  int      `json:"retweets"`
}
