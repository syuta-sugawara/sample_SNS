import actionCreatorFactory from 'typescript-fsa';
import { Dispatch } from 'redux';

import UserAPI from '../../requests/user';
import { ErrorResponse } from '../../types/errorResponse';
import { TweetType } from '../../types/tweet';
import { UserType } from '../../types/user';
import { ActionTypes } from '../actionTypes';
import { RootState } from '..';

const actionCreator = actionCreatorFactory();

const userAction = {
  getUser: actionCreator.async<{}, UserType, Error>(ActionTypes.getUser),
  getUserTweets: actionCreator.async<{}, TweetType[], Error>(
    ActionTypes.getUserTweets
  ),
  getUserLikeTweets: actionCreator.async<{}, TweetType[], Error>(
    ActionTypes.getUserLikeTweets
  ),
  postFollow: actionCreator.async<{}, UserType, Error>(ActionTypes.postFollow),
  deleteFollow: actionCreator.async<{}, UserType, Error>(
    ActionTypes.deleteFollow
  ),
};

export const fetchUser = (uid: string) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  dispatch(userAction.getUser.started({ params: {} }));
  const { auth } = getState();
  const userAPI = new UserAPI(auth.credentials.token);
  try {
    const res = await userAPI.getUser(uid);
    if (res.ok) {
      const result = (await res.json()) as UserType;
      dispatch(userAction.getUser.done({ result, params: {} }));
    } else {
      const result = (await res.json()) as ErrorResponse;
      throw new Error(result.message);
    }
  } catch (err) {
    const error = err as Error;
    dispatch(userAction.getUser.failed({ error, params: {} }));
  }
};

export const fetchUserTweets = (uid: string) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  dispatch(userAction.getUserTweets.started({ params: {} }));
  const { auth } = getState();
  const userAPI = new UserAPI(auth.credentials.token);
  try {
    const res = await userAPI.getUserTweets(uid);
    if (res.ok) {
      const response = (await res.json()) as TweetType[];
      const result = response === null ? [] : response;
      dispatch(userAction.getUserTweets.done({ result, params: {} }));
    } else {
      const result = (await res.json()) as ErrorResponse;
      throw new Error(result.message);
    }
  } catch (err) {
    const error = err as Error;
    dispatch(userAction.getUserTweets.failed({ error, params: {} }));
  }
};

export const fetchUserLikeTweets = (uid: string) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  dispatch(userAction.getUserLikeTweets.started({ params: {} }));
  const { auth } = getState();
  const userAPI = new UserAPI(auth.credentials.token);
  try {
    const res = await userAPI.getUsetLikeTweets(uid);
    if (res.ok) {
      const response = (await res.json()) as TweetType[];
      const result = response === null ? [] : response;
      dispatch(userAction.getUserLikeTweets.done({ result, params: {} }));
    } else {
      const result = (await res.json()) as ErrorResponse;
      throw new Error(result.message);
    }
  } catch (err) {
    const error = err as Error;
    dispatch(userAction.getUserLikeTweets.failed({ error, params: {} }));
  }
};

export const fetchFollow = (uid: string) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  dispatch(userAction.postFollow.started({ params: {} }));
  const { auth } = getState();
  const userAPI = new UserAPI(auth.credentials.token);
  try {
    const res = await userAPI.postFollow(uid);
    if (res.ok) {
      const result = (await res.json()) as UserType;
      dispatch(userAction.postFollow.done({ result, params: {} }));
    } else {
      const result = (await res.json()) as ErrorResponse;
      throw new Error(result.message);
    }
  } catch (err) {
    const error = err as Error;
    dispatch(userAction.postFollow.failed({ error, params: {} }));
  }
};

export const fetchUnFollow = (uid: string) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  dispatch(userAction.deleteFollow.started({ params: {} }));
  const { auth } = getState();
  const userAPI = new UserAPI(auth.credentials.token);
  try {
    const res = await userAPI.deleteFollow(uid);
    const result = (await res.json()) as UserType;
    if (res.ok) {
      dispatch(userAction.deleteFollow.done({ result, params: {} }));
    } else {
      const result = (await res.json()) as ErrorResponse;
      throw new Error(result.message);
    }
  } catch (err) {
    const error = err as Error;
    dispatch(userAction.deleteFollow.failed({ error, params: {} }));
  }
};

export default userAction;
