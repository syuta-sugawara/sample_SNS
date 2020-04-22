export type SignupType = {
  id: string;
  screenName: string;
  mail: string;
  password: string;
};

export type SigninType = {
  id: string;
  password: string;
};

export type CredentialType = {
  token: string;
  refreshToken: string;
};
