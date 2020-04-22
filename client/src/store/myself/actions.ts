import actionCreatorFactory from 'typescript-fsa';

import { UserType } from '../../types/user';
import { ActionTypes } from '../actionTypes';

const actionCreator = actionCreatorFactory();

const myselfAction = {
  set: actionCreator<{ user: UserType }>(ActionTypes.setMyself),
};

export default myselfAction;
