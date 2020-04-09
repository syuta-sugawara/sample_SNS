package main

import (
	"20fresh_o/backend/controller"
	"os"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {
	// 環境変数から値を取得する
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}
	// Echoのインスタンス作る
	e := echo.New()

	// 全てのリクエストで差し込みたいミドルウェア（ログとか）はここ
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	db := "dbのインスタンス"

	tweetController := controller.NewTweetController(db)

	// ルーティング
	e.GET("/tweets", tweetController.Index)

	// サーバー起動
	e.Logger.Fatal(e.Start(":" + port)) //ポート番号指定してね
}
