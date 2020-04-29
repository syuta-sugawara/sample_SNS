import fetch from 'isomorphic-unfetch';

import { SignupType, SigninType } from '../types/auth';

export default class AuthAPI {
  readonly reqUrl = `${process.env.API_URL}/auth`;

  postSignup = (data: SignupType) => {
    return fetch(`${this.reqUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(data),
    });
  };

  postSignin = (data: SigninType) => {
    return fetch(`${this.reqUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(data),
    });
  };
}
