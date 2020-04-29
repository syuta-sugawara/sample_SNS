import { ReactNode } from 'react';
import actionCreatorFactory from 'typescript-fsa';

import { ActionTypes } from '../actionTypes';

const actionCreator = actionCreatorFactory();

const modalAction = {
  show: actionCreator<{ children: ReactNode }>(ActionTypes.showModal),
  hide: actionCreator(ActionTypes.hideModal),
};

export default modalAction;
