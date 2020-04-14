import fetch from 'isomorphic-unfetch';

export default class TweetAPI {
  getAllTweets = (): Promise<Response> => {
    return fetch(`${process.env.API_URL}/tweets`);
  };
}
