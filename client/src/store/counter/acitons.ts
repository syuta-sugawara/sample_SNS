import actionCreatorFactory from 'typescript-fsa';
import { Dispatch } from 'redux';

import TweetAPI from '../../requests/tweet';
import { ActionTypes } from '../actionTypes';

const actionCreator = actionCreatorFactory();

const counterAction = {
  increment: actionCreator<{ count: number }>(ActionTypes.increment),
  decrement: actionCreator<{ count: number }>(ActionTypes.decrement),
  reset: actionCreator(ActionTypes.countReset),
  getAllDocs: actionCreator.async<{}, {}, {}>(ActionTypes.getAllDocs),
};

export const fetchDocs = (): any => {
  return (dispatch: Dispatch): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      dispatch(counterAction.getAllDocs.started({ params: {} }));
      const tweetAPI = new TweetAPI();
      tweetAPI
        .getAllTweets()
        .then(res => {
          console.log(res);
          return res.json().then(json => {
            if (res.ok) {
              dispatch(
                counterAction.getAllDocs.done({ result: json, params: {} })
              );
              resolve(json);
            } else {
              dispatch(
                counterAction.getAllDocs.failed({ error: json, params: {} })
              );
              reject(json);
            }
          });
        })
        .catch(error => {
          dispatch(counterAction.getAllDocs.failed({ error, params: {} }));
          reject(error);
        });
    });
  };
};

export default counterAction;
