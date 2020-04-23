import fetch from 'isomorphic-unfetch';
import AuthorizedAPI from './common';

export default class UserAPI extends AuthorizedAPI {
  readonly reqUrl = `${process.env.API_URL}/user`;

  constructor(token: string) {
    super(token);
  }

  getCurrentUser = () => {
    return fetch(this.reqUrl, { headers: { ...this.authHeader } });
  };

  getUser = (uid: string) => {
    return fetch(`${this.reqUrl}/${uid}`, { headers: { ...this.authHeader } });
  };

  getUserTweets = (uid: string) => {
    return fetch(`${this.reqUrl}/${uid}/tweets`, {
      headers: { ...this.authHeader },
    });
  };
}
