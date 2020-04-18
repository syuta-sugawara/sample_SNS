package entity

type Timeline struct {
	ID        int       `dynamo:"id"`
	Content   string    `dynamo:"content"`
	TweetType string    `dynamo:"tweetType"`
	CreatedAt int64     `dynamo:"createdAt"`
	UserID    string    `dynamo:"userID"`
	User      User      `dynamo:"user"`
	Tweet     *RefTweet `dynamo:"tweet"`
}
