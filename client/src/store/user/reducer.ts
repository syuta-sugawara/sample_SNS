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
    id: payload.result.id,
    screenName: payload.result.screenName,
    iconUrl: !payload.result.iconUrl ? defaultIconUrl : payload.result.iconUrl,
    headerUrl: !payload.result.headerUrl
      ? defaultHeaderUrl
      : payload.result.headerUrl,
    followIDs: payload.result.followIDs,
    followedIDs: payload.result.followedIDs,
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
  }));

export default userReducer;
