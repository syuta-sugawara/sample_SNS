package controller

import (
	"20fresh_o/backend/model"
	"net/http"

	"github.com/labstack/echo"
)

type TweetsController struct {
	tweetModel model.TweetModel
}

func NewTweetController(db string) TweetsController {
	return TweetsController{
		tweetModel: model.NewTweetModel(db),
	}
}

func (tc *TweetsController) Index(c echo.Context) error {
	tc.tweetModel.All()
	return c.String(http.StatusOK, "OK!")
}
