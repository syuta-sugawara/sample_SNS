package model

import (
	"fmt"
	"mime/multipart"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
)

func IsNotFound(err error) bool {
	if err.Error() == "dynamo: no item found" {
		return true
	}
	return false
}
func UploadImage(file multipart.File, name string) string {
	bucketName := "teamo-image"
	objectKey := "usericon/" + name + ".jpg"
	// creds := credentials.NewStaticCredentials("AWS_ACCESS_KEY", "AWS_SECRET_ACCESS_KEY", "")
	sess, err := session.NewSession(&aws.Config{
		//Credentials: creds,
		Region: aws.String("ap-northeast-1")},
	)
	if err != nil {
		fmt.Println(err)
	}

	uploader := s3manager.NewUploader(sess)
	_, err = uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(objectKey),
		Body:   file,
	})
	if err != nil {
		fmt.Println(err)
	}
	url := "https://teamo-image.s3-ap-northeast-1.amazonaws.com/" + objectKey
	return url
}
