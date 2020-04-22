import fetch from 'isomorphic-unfetch';

import { PostTweetType } from '../types/tweet';
import AuthorizedAPI from './common';

export default class TweetAPI extends AuthorizedAPI {
  constructor(token: string) {
    super(token);
  }

  getAllTweets = () => {
    return fetch(`${process.env.API_URL}/tweets`, {
      headers: { ...this.authHeader },
    });
  };

  postTweet = (data: PostTweetType) => {
    return fetch(`${process.env.API_URL}/tweets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        ...this.authHeader,
      },
      body: JSON.stringify(data),
    });
  };
}
