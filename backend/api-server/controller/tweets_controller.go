package controller

import (
	"backend/api-server/model"
	"net/http"

	"github.com/guregu/dynamo"
	"github.com/labstack/echo"
)

type TweetsController struct {
	tweetModel model.TweetModel
}

func NewTweetController(db *dynamo.DB) TweetsController {
	return TweetsController{
		tweetModel: model.NewTweetModel(db),
	}
}

// ツイート取得
func (tc *TweetsController) Index(c echo.Context) error {
	id := c.Param("id")
	tweet := tc.tweetModel.Get(id)
	return c.JSON(http.StatusOK, tweet)
}

// ツイート一覧取得
func (tc *TweetsController) TweetsIndex(c echo.Context) error {
	tweet := tc.tweetModel.All()
	return c.JSON(http.StatusOK, tweet)
}

// ツイート投稿
func (tc *TweetsController) Post(c echo.Context) error {
	tc.tweetModel.All()
	return c.String(http.StatusOK, "TweetPost")
}

// いいね
func (tc *TweetsController) Like(c echo.Context) error {
	tc.tweetModel.All()
	return c.String(http.StatusOK, "Like")
}

// リツイート
func (tc *TweetsController) Retweet(c echo.Context) error {
	tc.tweetModel.All()
	return c.String(http.StatusOK, "Retweet")
}
