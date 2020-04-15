package controller

import "backend/api-server/domain/entity"

func CreateErrorMessage(message string) entity.ErrorMessage {
	resp := entity.ErrorMessage{
		Message: message,
	}
	return resp
}
