package model

import (
	"crypto/rand"
	"encoding/binary"
	"strconv"
)

func IsNotFound(err error) bool {
	if err.Error() == "dynamo: no item found" {
		return true
	}
	return false
}
func UploadImage(i string) string {

	// TODO：アップロード処理
	// sess := session.Must(session.NewSessionWithOptions(session.Options{
	// 	Profile:           "di",
	// 	SharedConfigState: session.SharedConfigEnable,
	// }))
	// data, _ := base64.StdEncoding.DecodeString(i)
	// file, _ := os.Create(random() + ".jpg")
	// defer file.Close()

	// file.Write(data)

	// bucketName := "teamo-image"
	// objectKey := "/usericon"

	// uploader := s3manager.NewUploader(sess)
	// _, err := uploader.Upload(&s3manager.UploadInput{
	// 	Bucket: aws.String(bucketName),
	// 	Key:    aws.String(objectKey),
	// 	Body:   file,
	// })

	// if err != nil {
	// 	fmt.Println(err)
	// }
	return "url"
}

func random() string {
	var n uint64
	binary.Read(rand.Reader, binary.LittleEndian, &n)
	return strconv.FormatUint(n, 36)
}
