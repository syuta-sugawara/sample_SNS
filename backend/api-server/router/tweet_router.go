package router

import (
	"backend/api-server/controller"

	"github.com/guregu/dynamo"
	"github.com/labstack/echo"
)

func TweetRouter(e *echo.Echo, db *dynamo.DB) {
	tweetController := controller.NewTweetController(db)
	r := e.Group("/tweets")
	r.GET("", tweetController.TweetsIndex)
	r.POST("", tweetController.Post)
	r.GET("/:id", tweetController.Index)
	r.POST("/:id/likes", tweetController.Like)
	r.POST("/:id/retweets", tweetController.Retweet)
}
