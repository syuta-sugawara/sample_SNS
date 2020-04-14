import actionCreatorFactory from 'typescript-fsa';
import { Dispatch } from 'redux';

import TweetAPI from '../../requests/tweet';
import { ActionTypes } from '../actionTypes';

const actionCreator = actionCreatorFactory();

const tweetAction = {
  getTweetList: actionCreator.async<{}, [], {}>(ActionTypes.getTweetList),
};

export const fetchTweetList = (): any => {
  return (dispatch: Dispatch): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      dispatch(tweetAction.getTweetList.started({ params: {} }));
      const tweetAPI = new TweetAPI();
      tweetAPI
        .getAllTweets()
        .then(res => {
          return res.json().then(json => {
            if (res.ok) {
              dispatch(
                tweetAction.getTweetList.done({ result: json, params: {} })
              );
              resolve(json);
            } else {
              dispatch(
                tweetAction.getTweetList.failed({ error: json, params: {} })
              );
              reject(json);
            }
          });
        })
        .catch(error => {
          dispatch(tweetAction.getTweetList.failed({ error, params: {} }));
          reject(error);
        });
    });
  };
};

export default tweetAction;
