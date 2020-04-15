package controller

import (
	"backend/api-server/domain/entity"
	"backend/api-server/model"
	"net/http"
	"strings"

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
	tweets := tc.tweetModel.All()
	return c.JSON(http.StatusOK, tweets)
}

// ツイート投稿
func (tc *TweetsController) Post(c echo.Context) error {
	t := new(entity.PostTweet)
	c.Bind(t)
	content := strings.TrimSpace(t.Content)
	if content == "" {
		return c.JSON(http.StatusBadRequest, "Content is Required")
	}
	if len(t.Content) > 140{
		return c.JSON(http.StatusBadRequest, "Content is over 140")
	}
	tc.tweetModel.Create(t)
	return c.JSON(http.StatusOK, "POST success")
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
