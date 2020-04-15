import fetch from 'isomorphic-unfetch';

import { PostTweetType } from '../types/tweet';

export default class TweetAPI {
  getAllTweets = () => {
    return fetch(`${process.env.API_URL}/tweets`);
  };

  postTweet = (data: PostTweetType) => {
    return fetch(`${process.env.API_URL}/tweets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(data),
    });
  };
}
