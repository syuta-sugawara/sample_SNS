package entity

type User struct {
	ID         string `dynamo:"id" json:"id"`
	ScreenName string `dynamo:"screenName" json:"screenName"`
	IconUrl    string `dynamo:"iconUrl" json:"iconUrl"`
	//birthday    time.Time
	//followIDs   []string
	//followedIDs []string
}

type SignUpUser struct {
	ID         string `json:"id"`
	ScreenName string `json:"screenName"`
	Mail       string `json:"mail"`
	PassWord   string `json:"password"`
}

type SignInUser struct {
	ID       string `json:"id"`
	PassWord string `json:"password"`
}
