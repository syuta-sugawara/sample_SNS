import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { TweetType } from '../../types/tweet';
import { UserType } from '../../types/user';
import { defaultIconUrl, defaultHeaderUrl } from '../../utils/image';
import userAction from './actions';

export type StateType = UserType & {
  tweets: TweetType[];
  loading: boolean;
  error?: Error;
};

const initialState: StateType = {
  id: '',
  screenName: '',
  comment: '',
  iconUrl: '',
  headerUrl: '',
  followIDs: [],
  followedIDs: [],
  tweets: [],
  loading: false,
};

const userReducer = reducerWithInitialState(initialState)
  // getUser
  .case(userAction.getUser.started, state => ({
    ...state,
    loading: true,
    error: undefined,
  }))
  .case(userAction.getUser.done, (state, payload) => ({
    ...state,
    ...payload.result,
    iconUrl: !payload.result.iconUrl ? defaultIconUrl : payload.result.iconUrl,
    headerUrl: !payload.result.headerUrl
      ? defaultHeaderUrl
      : payload.result.headerUrl,
    loading: false,
    error: undefined,
  }))
  .case(userAction.getUser.failed, (state, payload) => ({
    ...state,
    loading: false,
    error: payload.error,
  }))
  // getUserTweets
  .case(userAction.getUserTweets.started, state => ({
    ...state,
    loading: true,
    error: undefined,
  }))
  .case(userAction.getUserTweets.done, (state, payload) => ({
    ...state,
    tweets: payload.result,
    loading: false,
    error: undefined,
  }))
  .case(userAction.getUserTweets.failed, (state, payload) => ({
    ...state,
    loading: false,
    error: payload.error,
  }))
  // getUserLikeTweets
  .case(userAction.getUserLikeTweets.started, state => ({
    ...state,
    loading: true,
    error: undefined,
  }))
  .case(userAction.getUserLikeTweets.done, (state, payload) => ({
    ...state,
    tweets: payload.result,
    loading: false,
    error: undefined,
  }))
  .case(userAction.getUserLikeTweets.failed, (state, payload) => ({
    ...state,
    loading: false,
    error: payload.error,
  }))
  // postFollow
  .case(userAction.postFollow.started, state => ({
    ...state,
    loading: true,
    error: undefined,
  }))
  .case(userAction.postFollow.done, (state, payload) => ({
    ...state,
    ...payload.result,
    iconUrl: !payload.result.iconUrl ? defaultIconUrl : payload.result.iconUrl,
    headerUrl: !payload.result.headerUrl
      ? defaultHeaderUrl
      : payload.result.headerUrl,
    loading: false,
    error: undefined,
  }))
  .case(userAction.postFollow.failed, (state, payload) => ({
    ...state,
    loading: false,
    error: payload.error,
  }))
  // deleteFollow
  .case(userAction.deleteFollow.started, state => ({
    ...state,
    loading: true,
    error: undefined,
  }))
  .case(userAction.deleteFollow.done, (state, payload) => ({
    ...state,
    ...payload.result,
    iconUrl: !payload.result.iconUrl ? defaultIconUrl : payload.result.iconUrl,
    headerUrl: !payload.result.headerUrl
      ? defaultHeaderUrl
      : payload.result.headerUrl,
    loading: false,
    error: undefined,
  }))
  .case(userAction.deleteFollow.failed, (state, payload) => ({
    ...state,
    loading: false,
    error: payload.error,
  }));

export default userReducer;
