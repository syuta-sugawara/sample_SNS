package services

import (
	"backend/api-server/domain/entity"
	"os"

	"github.com/aws/aws-sdk-go/aws"
	cognito "github.com/aws/aws-sdk-go/service/cognitoidentityprovider"
)

type UserServices struct {
	auth *cognito.CognitoIdentityProvider
}

func NewUserServices(auth *cognito.CognitoIdentityProvider) UserServices {
	return UserServices{
		auth: auth,
	}
}

func (us *UserServices) CreateUserOnCognito(u *entity.SignUpUser) error {
	signInParams := &cognito.SignUpInput{
		Username:       aws.String(u.ID),
		Password:       aws.String(u.PassWord),
		ClientId:       aws.String(os.Getenv("CLIENT_ID")),
		UserAttributes: []*cognito.AttributeType{{Name: aws.String("email"), Value: aws.String(u.Mail)}},
	}

	if _, err := us.auth.SignUp(signInParams); err != nil {
		return err
	}
	// ローカルでは認証が失敗するけど本番行けそう
	// confirmPrams := &cognito.AdminConfirmSignUpInput{
	// 	Username:   aws.String(u.ID),
	// 	UserPoolId: aws.String(os.Getenv("POOL_ID")),
	// }

	// if _, err := us.auth.AdminConfirmSignUp(confirmPrams); err != nil {
	// 	return err
	// }
	return nil
}

func (us *UserServices) GetToken(u *entity.SignInUser) (*entity.Credentials, error) {
	params := &cognito.InitiateAuthInput{
		AuthFlow: aws.String("USER_PASSWORD_AUTH"),
		AuthParameters: map[string]*string{
			"USERNAME": aws.String(u.ID),
			"PASSWORD": aws.String(u.PassWord),
		},
		ClientId: aws.String(os.Getenv("CLIENT_ID")),
	}

	resp, err := us.auth.InitiateAuth(params)
	if err != nil {
		return nil, err
	}

	credentials := entity.Credentials{
		AccessToken:  *resp.AuthenticationResult.AccessToken,
		RefreshToken: resp.AuthenticationResult.RefreshToken,
	}

	return &credentials, nil
}

func (us *UserServices) GetTokenWtihRefreshToken(refreshToken string) (*entity.Credentials, error) {
	params := &cognito.InitiateAuthInput{
		AuthFlow: aws.String("REFRESH_TOKEN_AUTH"),
		AuthParameters: map[string]*string{
			"REFRESH_TOKEN": aws.String(refreshToken),
		},
		ClientId: aws.String(os.Getenv("CLIENT_ID")),
	}

	resp, err := us.auth.InitiateAuth(params)
	if err != nil {
		return nil, err
	}

	credentials := entity.Credentials{
		AccessToken: *resp.AuthenticationResult.AccessToken,
	}

	return &credentials, nil
}

func (us *UserServices) VerifyUserOnCognito(accessToken string) (*string, error) {
	params := &cognito.GetUserInput{
		AccessToken: aws.String(accessToken),
	}

	resp, err := us.auth.GetUser(params)
	if err != nil {
		return nil, err
	}
	return resp.Username, err
}
