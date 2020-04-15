import actionCreatorFactory from 'typescript-fsa';

import { ActionTypes } from '../actionTypes';

const actionCreator = actionCreatorFactory();

const modalAction = {
  setIsDisplay: actionCreator<{ isDisplay: boolean }>(
    ActionTypes.setIsDisplayModal
  ),
};

export default modalAction;
