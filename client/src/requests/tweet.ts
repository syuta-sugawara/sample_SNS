import fetch from 'isomorphic-unfetch';

export default class TweetAPI {
  getAllTweets = (): Promise<Response> => {
    return fetch('http://localhost:1323/tweets/9');
  };
}
