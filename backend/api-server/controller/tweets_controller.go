package controller

import (
	"20fresh_o/backend/model"
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

func (tc *TweetsController) Index(c echo.Context) error {
	tc.tweetModel.All()
	return c.String(http.StatusOK, "OK!")
}
