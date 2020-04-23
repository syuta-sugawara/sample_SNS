package entity

type User struct {
	ID         string `dynamo:"id" json:"id"`
	ScreenName string `dynamo:"screenName" json:"screenName"`
	IconUrl    string `dynamo:"iconUrl" json:"iconUrl"`
	//birthday    time.Time
	FollowIDs   []string `dynamo:"followIDs" json:"followIDs"`
	FollowedIDs []string `dynamo:"followedIDs" json:"followedIDs"`
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

type RefreshTokenReq struct {
	RefreshToken string `json:"refreshToken"`
}
type RefreshTokenResp struct {
	Token string `json:"token"`
}

type SignInResp struct {
	Token        string `json:"token"`
	RefreshToken string `json:"refreshToken"`
}

type DisplayUser struct {
	ID         string `json:"id"`
	ScreenName string `json:"screenName"`
	IconUrl    string `json:"iconUrl"`
}
