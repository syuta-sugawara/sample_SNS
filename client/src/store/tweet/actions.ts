import actionCreatorFactory from 'typescript-fsa';
import { Dispatch } from 'redux';

import TweetAPI from '../../requests/tweet';
import { ActionTypes } from '../actionTypes';
import modalAction from '../modal/actions';
import { TweetType, PostTweetType } from '../../types/tweet';
import { ErrorResponse } from '../../types/errorResponse';

const actionCreator = actionCreatorFactory();

const tweetAction = {
  getTweetList: actionCreator.async<{}, TweetType[], Error>(
    ActionTypes.getTweetList
  ),
  postTweet: actionCreator.async<{}, {}, Error>(ActionTypes.postTweet),
};

export const fetchTweetList = () => async (dispatch: Dispatch) => {
  dispatch(tweetAction.getTweetList.started({ params: {} }));
  const tweetAPI = new TweetAPI();
  try {
    const res = await tweetAPI.getAllTweets();
    if (res.ok) {
      const result = (await res.json()) as TweetType[];
      dispatch(tweetAction.getTweetList.done({ result, params: {} }));
    } else {
      const result = (await res.json()) as ErrorResponse;
      throw new Error(result.massage);
    }
  } catch (err) {
    const error = err as Error;
    dispatch(tweetAction.getTweetList.failed({ error, params: {} }));
  }
};

export const fetchPostTweet = (data: PostTweetType) => async (
  dispatch: Dispatch
): Promise<any> => {
  dispatch(tweetAction.postTweet.started({ params: {} }));
  const tweetAPI = new TweetAPI();
  try {
    const res = await tweetAPI.postTweet(data);
    if (res.ok) {
      const result = await res.json();
      dispatch(tweetAction.postTweet.done({ result, params: {} }));
      dispatch(modalAction.setIsDisplay({ isDisplay: false }));
    } else {
      const result = (await res.json()) as ErrorResponse;
      throw new Error(result.massage);
    }
  } catch (err) {
    const error = err as Error;
    dispatch(tweetAction.getTweetList.failed({ error, params: {} }));
  }
};

export default tweetAction;
