package model

import (
	"errors"
	"mime/multipart"
	"regexp"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
)

func IsNotFound(err error) bool {
	if err.Error() == "dynamo: no item found" {
		return true
	}
	return false
}
func (um *UserModel) UploadImage(f *multipart.FileHeader, userID string, key string) (*string, error) {
	file, err := f.Open()
	if err != nil {
		return nil, err
	}
	defer file.Close()
	bucketName := "teamo-image"
	extension, err := imageExtension(f.Filename)
	if err != nil {
		return nil, err
	}
	objectKey := key + "/" + userID + *extension
	_, err = um.upload.Upload(&s3manager.UploadInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(objectKey),
		Body:   file,
	})
	if err != nil {
		return nil, err
	}
	url := "https://teamo-image.s3-ap-northeast-1.amazonaws.com/" + objectKey
	return &url, nil
}

func imageExtension(fileName string) (*string, error) {
	result := regexp.MustCompile(`(\.png|\.jpe?g|\.gif)$`).FindStringSubmatch(fileName)
	if len(result) == 0 {
		return nil, errors.New("invalid extentions")
	}
	return &result[0], nil
}
