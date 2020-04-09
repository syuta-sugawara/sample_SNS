import { Action } from 'redux';

import { ActionTypes } from '../actionTypes';

export type Count = {
  value: number;
};

type IncrementAction = Action & {
  type: typeof ActionTypes.increment;
};

type DecrementAction = Action & {
  type: typeof ActionTypes.decrement;
};

type ResetAction = Action & {
  type: typeof ActionTypes.countReset;
};

export type CounterActionTypes =
  | IncrementAction
  | DecrementAction
  | ResetAction;
