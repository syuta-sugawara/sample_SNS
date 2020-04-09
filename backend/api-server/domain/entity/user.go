package entity

import "time"

type User struct {
	id          string
	uid         string
	screenName  string
	mail        string
	iconUrl     string
	birthday    time.Time
	followIDs   []string
	followedIDs []string
}
