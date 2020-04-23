import actionCreatorFactory from 'typescript-fsa';
import { Dispatch } from 'redux';

import TweetAPI from '../../requests/tweet';
import { ActionTypes } from '../actionTypes';
import modalAction from '../modal/actions';
import { TweetType, PostTweetType } from '../../types/tweet';
import { ErrorResponse } from '../../types/errorResponse';
import { RootState } from '..';

const actionCreator = actionCreatorFactory();

const tweetAction = {
  getTweetList: actionCreator.async<{}, TweetType[], Error>(
    ActionTypes.getTweetList
  ),
  postTweet: actionCreator.async<{}, {}, Error>(ActionTypes.postTweet),
};

export const fetchTweetList = () => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  dispatch(tweetAction.getTweetList.started({ params: {} }));
  const { auth } = getState();

  const tweetAPI = new TweetAPI(auth.credentials.token);
  try {
    const res = await tweetAPI.getAllTweets();
    if (res.ok) {
      const response = (await res.json()) as TweetType[];
      const result = response === null ? [] : response;
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
  dispatch: Dispatch,
  getState: () => RootState
): Promise<any> => {
  dispatch(tweetAction.postTweet.started({ params: {} }));
  const { auth } = getState();
  const tweetAPI = new TweetAPI(auth.credentials.token);
  try {
    const res = await tweetAPI.postTweet(data);
    if (res.ok) {
      const result = await res.json();
      dispatch(tweetAction.postTweet.done({ result, params: {} }));
      dispatch(modalAction.hide());
      dispatch(fetchTweetList() as any);
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
