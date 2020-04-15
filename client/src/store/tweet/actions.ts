import actionCreatorFactory from 'typescript-fsa';
import { Dispatch } from 'redux';

import TweetAPI from '../../requests/tweet';
import { ActionTypes } from '../actionTypes';
import { TweetType } from '../../types/tweet';
import { ErrorRespose } from '../../types/errorRespose';

const actionCreator = actionCreatorFactory();

const tweetAction = {
  getTweetList: actionCreator.async<{}, TweetType[], Error>(
    ActionTypes.getTweetList
  ),
};

export const fetchTweetList = () => async (
  dispatch: Dispatch
): Promise<void> => {
  dispatch(tweetAction.getTweetList.started({ params: {} }));
  const tweetAPI = new TweetAPI();
  try {
    const res = await tweetAPI.getAllTweets();
    if (res.ok) {
      const result = (await res.json()) as TweetType[];
      dispatch(tweetAction.getTweetList.done({ result, params: {} }));
    } else {
      const result = (await res.json()) as ErrorRespose;
      throw new Error(result.massage);
    }
  } catch (err) {
    const error = err as Error;
    dispatch(tweetAction.getTweetList.failed({ error, params: {} }));
  }
};

export default tweetAction;
