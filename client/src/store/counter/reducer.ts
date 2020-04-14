import { reducerWithInitialState } from 'typescript-fsa-reducers';

import counterAction from './acitons';

export type CountType = {
  value: number;
  results: {};
  loading: boolean;
  error: any;
};

const initialState: CountType = {
  value: 0,
  results: [],
  loading: false,
  error: null,
};

const countReducer = reducerWithInitialState(initialState)
  .case(counterAction.increment, (state, payload) => ({
    ...state,
    value: state.value + payload.count,
  }))
  .case(counterAction.decrement, (state, payload) => ({
    ...state,
    value: state.value - payload.count,
  }))
  .case(counterAction.getAllDocs.started, state => ({
    ...state,
    results: [],
    loading: true,
    error: null,
  }))
  .case(counterAction.getAllDocs.done, (state, payload) => ({
    ...state,
    results: payload.result,
    loading: false,
    error: null,
  }))
  .case(counterAction.getAllDocs.failed, (state, payload) => ({
    ...state,
    results: [],
    loading: false,
    error: payload.error,
  }));

export default countReducer;
