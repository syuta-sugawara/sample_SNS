import fetch from 'isomorphic-unfetch';

import { PostTweetType } from '../types/tweet';
import AuthorizedAPI from './common';

export default class TweetAPI extends AuthorizedAPI {
  readonly TWEET_API_URL = `${process.env.API_URL}/tweets`;

  constructor(token?: string) {
    super(token);
  }

  getAllTweets = () => {
    return fetch(this.TWEET_API_URL, {
      headers: { ...this.authHeader },
    });
  };

  postTweet = (data: PostTweetType) => {
    return fetch(this.TWEET_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        ...this.authHeader,
      },
      body: JSON.stringify(data),
    });
  };

  postLike = async () => {
    const response = await fetch(`${this.TWEET_API_URL}/{tweetsID}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    return response;
  };

  putRetweets = async () => {
    const response = await fetch(`${this.TWEET_API_URL}/{tweetsID}/retweet`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    return response;
  };
}
