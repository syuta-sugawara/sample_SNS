package services

import (
	"fmt"
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

func (us *UserServices) CreateUserOnCognito(id string, mail string, pass string) {
	signInParams := &cognito.SignUpInput{
		Username:       aws.String(id),
		Password:       aws.String(pass),
		ClientId:       aws.String(os.Getenv("CLIENT_ID")),
		UserAttributes: []*cognito.AttributeType{{Name: aws.String("email"), Value: aws.String(mail)}},
	}

	signInResp, err := us.auth.SignUp(signInParams)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	fmt.Println(signInResp)

	confirmPrams := &cognito.AdminConfirmSignUpInput{
		Username:   aws.String(id),
		UserPoolId: aws.String(os.Getenv("POOL_ID")),
	}

	confirmResp, err := us.auth.AdminConfirmSignUp(confirmPrams)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	fmt.Println(confirmResp)
}

func (us *UserServices) GetUserFromCognito(id string, pass string) *string {
	params := &cognito.InitiateAuthInput{
		AuthFlow: aws.String("USER_PASSWORD_AUTH"),
		AuthParameters: map[string]*string{
			"USERNAME": aws.String(id),
			"PASSWORD": aws.String(pass),
		},
		ClientId: aws.String(os.Getenv("CLIENT_ID")),
	}

	resp, err := us.auth.InitiateAuth(params)
	if err != nil {
		fmt.Println(err.Error())
		return nil
	}
	fmt.Println(resp)

	return resp.AuthenticationResult.AccessToken
}

func (us *UserServices) VerifyUserOnCognito(accessToken string) {
	params := &cognito.GetUserInput{
		AccessToken: aws.String(accessToken),
	}

	resp, err := us.auth.GetUser(params)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	fmt.Println(resp)
}
