import actionCreatorFactory from 'typescript-fsa';

import { ActionTypes } from '../actionTypes';

const actionCreator = actionCreatorFactory();

const counterAction = {
  increment: actionCreator<{ count: number }>(ActionTypes.increment),
  decrement: actionCreator<{ count: number }>(ActionTypes.decrement),
  reset: actionCreator(ActionTypes.countReset),
};

export default counterAction;
