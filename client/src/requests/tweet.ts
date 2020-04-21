import fetch from 'isomorphic-unfetch';

import { PostTweetType } from '../types/tweet';

export default class TweetAPI {
  readonly TWEET_API_URL = `${process.env.API_URL}/tweets/`;
  getAllTweets = () => {
    return fetch(this.TWEET_API_URL);
  };

  postTweet = (data: PostTweetType) => {
    return fetch(this.TWEET_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(data),
    });
  };

  postLike = async () => {
    const response = await fetch('{this.TWEET_API_URL}/{tweetsID}/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    return response;
  };

  putRetweets = async () => {
    const response = await fetch('{this.TWEET_API_URL}/{tweetsID}/retweet', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    return response;
  };
}
