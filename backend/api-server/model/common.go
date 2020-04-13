package model

func IsNotFound(err error) bool {
	if err.Error() == "dynamo: no item found" {
		return true
	}
	return false
}
