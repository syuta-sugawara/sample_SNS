import { ReactNode } from 'react';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import modalAction from './actions';

export type stateType = {
  isDisplay: boolean;
  children: ReactNode;
};

const initialState: stateType = {
  isDisplay: false,
  children: undefined,
};

const modalReducer = reducerWithInitialState(initialState)
  .case(modalAction.show, (state, payload) => ({
    ...state,
    isDisplay: true,
    children: payload.children,
  }))
  .case(modalAction.hide, state => ({
    ...state,
    isDisplay: false,
    children: undefined,
  }));

export default modalReducer;
