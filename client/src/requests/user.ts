import fetch from 'isomorphic-unfetch';

export default class UserAPI {
  readonly reqUrl = `${process.env.API_URL}/user`;

  getUser = (uid: string) => {
    return fetch(`${this.reqUrl}/${uid}`);
  };

  postFollow = (uid: string) => {
    return fetch(`${this.reqUrl}/${uid}/follow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  };

  deleteFollow = (uid: string) => {
    return fetch(`${this.reqUrl}/${uid}/follow`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  };
}
