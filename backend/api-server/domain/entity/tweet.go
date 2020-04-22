package entity

type Tweet struct {
	ID           int    `dynamo:"id" json:"id"`
	Content      string `dynamo:"content" json:"content"`
	TweetType    string `dynamo:"tweetType" json:"tweetType"`
	UserID       string `dynamo:"userID" json:"userID"`
	CreatedAt    int64  `dynamo:"createdAt" json:"createdAt"`
	RefTweetID   *int   `dynamo:"refTweetID" json:"refTweetID"`
	RefTweet     *Tweet `dynamo:"refTweet" json:"refTweet"`
	LikeCount    int    `dynamo:"likeCount" json:"likeCount"`
	RetweetCount int    `dynamo:"retweetCount" json:"retweetCount"`
}

type PostTweet struct {
	Content   string `json:"content"`
	TweetType string `json:"tweetType"`
	Likes     int    `json:"likes"`
}

type TweetResp struct {
	ID           int    `dynamo:"id" json:"id"`
	Content      string `dynamo:"content" json:"content"`
	TweetType    string `dynamo:"tweetType" json:"tweetType"`
	UserID       string `dynamo:"userID" json:"userID"`
	CreatedAt    int64  `dynamo:"createdAt" json:"createdAt"`
	RefTweetID   *int   `dynamo:"refTweetID" json:"refTweetID"`
	RefTweet     *Tweet `dynamo:"refTweet" json:"refTweet"`
	LikeCount    int    `dynamo:"likeCount" json:"likeCount"`
	RetweetCount int    `dynamo:"retweetCount" json:"retweetCount"`
	User         User   `dynamo:"user" json:"user"`
}

type NewTweet struct {
	ID        int
	Content   string
	TweetType string
}

type RespCount struct {
	Message string `json:"message"`
	Count   int    `json:"count"`
}
