package main

import (
	"20fresh_o/backend/controller"
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/guregu/dynamo"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

type Sample struct {
	UserID string `dynamo:"UserID,hash"`
	Name   string `dynamo:"Name"`
}

func main() {
	// 環境変数から値を取得する
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	sess, err := session.NewSession(&aws.Config{
		Region:      aws.String("ap-northeast-1"),
		Endpoint:    aws.String("http://localhost:8000"),
		Credentials: credentials.NewStaticCredentials("dummy", "dummy", "dummy"),
	})
	if err != nil {
		panic(err)
	}

	// dbインスタンスを作成
	db := dynamo.New(sess)

	// Echoのインスタンス作る
	e := echo.New()

	// 全てのリクエストで差し込みたいミドルウェア（ログとか）はここ
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	tweetController := controller.NewTweetController(db)

	// ルーティング
	e.GET("/tweets", tweetController.Index)

	// サーバー起動
	e.Logger.Fatal(e.Start(":" + port)) //ポート番号指定してね
}
