package entity

type Timeline struct {
	ID        int       `dynamo:"id" json:"id"`
	Content   string    `dynamo:"content" json:"content"`
	TweetType string    `dynamo:"tweetType" json:"tweetType"`
	CreatedAt int64     `dynamo:"createdAt" json:"createdAt"`
	UserID    string    `dynamo:"userID" json:"userID"`
	User      User      `dynamo:"user" json:"user"`
	Tweet     *RefTweet `dynamo:"tweet" json:"tweet"`
	Likes     int       `dynamo:"likes" json:"likes"`
}
