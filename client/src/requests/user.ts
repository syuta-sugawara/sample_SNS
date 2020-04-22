import fetch from 'isomorphic-unfetch';

export default class UserAPI {
  readonly reqUrl = `${process.env.API_URL}/user`;
  getUser = (uid: string) => {
    return fetch(`${this.reqUrl}/${uid}`);
  };
}
