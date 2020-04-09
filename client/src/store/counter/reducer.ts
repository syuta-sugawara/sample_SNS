import { ActionTypes } from '../actionTypes';
import { Count, CounterActionTypes } from './types';

const initialState: Count = {
  value: 0,
};

export const countReducer = (
  state = initialState,
  action: CounterActionTypes
): Count => {
  switch (action.type) {
    case ActionTypes.increment:
      return { value: state.value + 1 };
    case ActionTypes.decrement:
      return { value: state.value === 0 ? 0 : state.value - 1 };
    default:
      return state;
  }
};
