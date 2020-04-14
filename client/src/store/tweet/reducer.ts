import { reducerWithInitialState } from 'typescript-fsa-reducers';

import tweetAction from './actions';

import { TweetType } from '../../types/tweet';

export type stateType = {
  results: TweetType[];
  loading: boolean;
  error: any;
};

const initialState: stateType = {
  results: [],
  loading: false,
  error: null,
};

const tweetReducer = reducerWithInitialState(initialState)
  .case(tweetAction.getTweetList.started, state => ({
    ...state,
    results: [],
    loading: true,
    error: null,
  }))
  .case(tweetAction.getTweetList.done, (state, payload) => ({
    ...state,
    results: payload.result,
    loading: false,
    error: null,
  }))
  .case(tweetAction.getTweetList.failed, (state, payload) => ({
    ...state,
    loading: false,
    error: payload.error,
  }));

export default tweetReducer;
