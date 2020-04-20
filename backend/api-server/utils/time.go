package utils

import "time"

func GetNowMillsec() int64 {
	return time.Now().UnixNano() / 1000000
}
