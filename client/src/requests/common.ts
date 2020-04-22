export default class API {
  public token: string;

  constructor(token?: string) {
    this.token = token || localStorage.getItem('token') || '';
  }

  public get authHeader() {
    const header = {
      Authorization: `bearer ${this.token}`,
    };

    return header;
  }
}
