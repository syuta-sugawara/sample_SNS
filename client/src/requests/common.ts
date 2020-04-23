export default class AuthorizedAPI {
  public token: string;

  constructor(token: string) {
    this.token = token;
  }

  public get authHeader() {
    const header = {
      Authorization: `bearer ${this.token}`,
    };

    return header;
  }
}
