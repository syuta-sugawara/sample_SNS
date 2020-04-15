package model

import "backend/api-server/domain/entity"

func IsNotFound(err error) bool {
	if err.Error() == "dynamo: no item found" {
		return true
	}
	return false
}

func Message(message string) entity.ErrorRespose {
	resp := entity.ErrorRespose{
		Message: message,
	}
	return resp
}
