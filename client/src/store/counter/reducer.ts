import { reducerWithInitialState } from 'typescript-fsa-reducers';

import counterAction from './acitons';

export type CountType = {
  value: number;
};

const initialState: CountType = {
  value: 0,
};

const countReducer = reducerWithInitialState(initialState)
  .case(counterAction.increment, (state, payload) => ({
    ...state,
    value: state.value + payload.count,
  }))
  .case(counterAction.decrement, (state, payload) => ({
    ...state,
    value: state.value - payload.count,
  }));

export default countReducer;
