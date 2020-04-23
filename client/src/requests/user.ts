import fetch from 'isomorphic-unfetch';

import { PutCurrentUserType } from '../types/auth';
import AuthorizedAPI from './common';

export default class UserAPI extends AuthorizedAPI {
  readonly reqUrl = `${process.env.API_URL}/user`;

  constructor(token: string) {
    super(token);
  }

  getCurrentUser = () => {
    return fetch(this.reqUrl, { headers: { ...this.authHeader } });
  };

  putCurrentUser = (data: PutCurrentUserType) => {
    const formData = new FormData();
    formData.append('screenName', data.screenName);
    formData.append('comment', data.comment);
    formData.append('iconImg', data.iconImg);
    formData.append('headerImg', data.headerImg);
    console.log(data);
    return fetch(this.reqUrl, {
      method: 'PUT',
      headers: { ...this.authHeader },
      body: formData,
    });
  };

  getUser = (uid: string) => {
    return fetch(`${this.reqUrl}/${uid}`, { headers: { ...this.authHeader } });
  };

  getUserTweets = (uid: string) => {
    return fetch(`${this.reqUrl}/${uid}/tweets`, {
      headers: { ...this.authHeader },
    });
  };

  postFollow = (uid: string) => {
    return fetch(`${this.reqUrl}/${uid}/follow`, {
      method: 'POST',
      headers: {
        ...this.authHeader,
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  };

  deleteFollow = (uid: string) => {
    return fetch(`${this.reqUrl}/${uid}/follow`, {
      method: 'DELETE',
      headers: {
        ...this.authHeader,
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  };
}
