package entity

type User struct {
	ID         string `dynamo:"id" json:"id"`
	ScreenName string `dynamo:"screenName" json:"screenName"`
	IconUrl    string `dynamo:"iconUrl" json:"iconUrl"`
	//birthday    time.Time
	//followIDs   []string
	//followedIDs []string
}
