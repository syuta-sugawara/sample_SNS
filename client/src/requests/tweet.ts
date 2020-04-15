import fetch from 'isomorphic-unfetch';

export default class TweetAPI {
  getAllTweets = () => {
    return fetch(`${process.env.API_URL}/tweets`);
  };
}
