package controller

import (
	"backend/api-server/domain/entity"
	"backend/api-server/model"
	"net/http"

	cognito "github.com/aws/aws-sdk-go/service/cognitoidentityprovider"
	"github.com/guregu/dynamo"
	"github.com/labstack/echo"
)

type TweetsController struct {
	tweetModel model.TweetModel
}

func NewTweetController(db *dynamo.DB, auth *cognito.CognitoIdentityProvider) TweetsController {
	return TweetsController{
		tweetModel: model.NewTweetModel(db, auth),
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
