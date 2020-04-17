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

  postLike = async () => {
    const response = await fetch(
      `${process.env.API_URL}/tweets/{tweetsID}/like`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        // body: JSON.stringify(data),
      }
    );
    return response;
  };

  putRetweets = async () => {
    const response = await fetch(
      `${process.env.API_URL}/tweets/{tweetsID}/retweet`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        // body: JSON.stringify(data),
      }
    );
    return response;
  };
}
