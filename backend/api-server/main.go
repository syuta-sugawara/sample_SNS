package main

import (
	"backend/api-server/controller"
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/guregu/dynamo"
	"github.com/joho/godotenv"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {
	// 環境変数の取得
	godotenv.Load()

	// 環境変数から値を取得する
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	sess, err := session.NewSession(&aws.Config{
		Region:      aws.String("ap-northeast-1"),
		Endpoint:    aws.String(os.Getenv("DYNAMO_ENDPOINT")),
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
	userController := controller.NewUserController(db)

	// ルーティング
	// Users
	e.GET("/users/:userName", userController.UserIndex)
	e.GET("/users/:userName/follows", userController.FollowsIndex)
	e.GET("/users/:userName/followers", userController.FollowersIndex)
	e.PUT("/users/:userName", userController.UpdateUser)
	e.POST("/users/:userName", userController.RegisterUser)
	e.POST("/users/:userName/follow", userController.Follow)
	e.DELETE("/users/:userName/follow", userController.Unfollow)

	// Tweets
	e.GET("/tweetsss", tweetController.TweetsIndex)
	e.POST("/tweets", tweetController.Post)
	e.GET("/tweets/:id", tweetController.Index)
	e.POST("/tweets/:id/likes", tweetController.Like)
	e.POST("/tweets/:id/retweets", tweetController.Retweet)

	// ルーティング
	e.GET("/tweets", tweetController.Index)

	// サーバー起動
	e.Logger.Fatal(e.Start(":" + port)) //ポート番号指定してね
}
