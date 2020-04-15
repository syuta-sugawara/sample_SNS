import { reducerWithInitialState } from 'typescript-fsa-reducers';

import modalAction from './actions';

export type stateType = {
  isDisplay: boolean;
};

const initialState: stateType = {
  isDisplay: false,
};

const modalReducer = reducerWithInitialState(initialState).case(
  modalAction.setIsDisplay,
  (state, payload) => ({
    ...state,
    isDisplay: payload.isDisplay,
  })
);

export default modalReducer;
