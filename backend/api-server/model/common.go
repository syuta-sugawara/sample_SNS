package model

import (
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
	extension := imageExtension(f.Filename)
	objectKey := key + "/" + userID + extension
	_, err = um.upload.Upload(&s3manager.UploadInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(objectKey),
		Body:   file,
	})
	if err != nil {
		return nil, err
	}
	url := "https://teamo-image.s3-ap-northeast-1.amazonaws.com/" + objectKey + extension
	return &url, nil
}

func imageExtension(fileName string) string {
	extension := ""
	if regexp.MustCompile(`.png`).MatchString(fileName) {
		extension = ".png"
	}
	if regexp.MustCompile(`.gif`).MatchString(fileName) {
		extension = ".gif"
	}
	if regexp.MustCompile(`.jpg`).MatchString(fileName) {
		extension = ".jpg"
	}
	if regexp.MustCompile(`.jpeg`).MatchString(fileName) {
		extension = ".jpeg"
	}
	return extension
}
