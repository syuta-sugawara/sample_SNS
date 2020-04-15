import { reducerWithInitialState } from 'typescript-fsa-reducers';

import tweetAction from './actions';

import { TweetType } from '../../types/tweet';

export type stateType = {
  results: TweetType[];
  loading: boolean;
  error?: Error;
};

const initialState: stateType = {
  results: [],
  loading: false,
};

const tweetReducer = reducerWithInitialState(initialState)
  .case(tweetAction.getTweetList.started, state => ({
    ...state,
    results: [],
    loading: true,
    error: undefined,
  }))
  .case(tweetAction.getTweetList.done, (state, payload) => ({
    ...state,
    results: payload.result,
    loading: false,
    error: undefined,
  }))
  .case(tweetAction.getTweetList.failed, (state, payload) => ({
    ...state,
    loading: false,
    error: payload.error,
  }));

export default tweetReducer;
