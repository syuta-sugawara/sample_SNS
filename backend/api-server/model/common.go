package model

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/labstack/echo"
)

func IsNotFound(err error) bool {
	if err.Error() == "dynamo: no item found" {
		return true
	}
	return false
}
func (um *UserModel) UploadImage(c echo.Context, userID string, key string) (string, error) {
	i, err := c.FormFile(key)
	if err != nil {
		return "", err
	}
	file, err := i.Open()
	if err != nil {
		return "", err
	}
	defer file.Close()
	bucketName := "teamo-image"
	objectKey := "usericon/" + userID + key + ".jpg"
	_, err = um.upload.Upload(&s3manager.UploadInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(objectKey),
		Body:   file,
	})
	if err != nil {
		return "", err
	}
	url := "https://teamo-image.s3-ap-northeast-1.amazonaws.com/" + objectKey
	return url, nil
}
