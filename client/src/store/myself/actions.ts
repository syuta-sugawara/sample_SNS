import actionCreatorFactory from 'typescript-fsa';
import { Dispatch } from 'redux';

import { ErrorResponse } from '../../types/errorResponse';
import { UserType } from '../../types/user';
import { ActionTypes } from '../actionTypes';
import UserAPI from '../../requests/user';

const actionCreator = actionCreatorFactory();

const myselfAction = {
  getUser: actionCreator.async<{}, UserType, Error>(ActionTypes.getCurrentUser),
};

export const fetchCurrentUser = () => async (dispatch: Dispatch) => {
  dispatch(myselfAction.getUser.started({ params: {} }));
  const userAPI = new UserAPI();
  try {
    const res = await userAPI.getCurrentUser();
    if (res.ok) {
      const result = (await res.json()) as UserType;
      dispatch(myselfAction.getUser.done({ result, params: {} }));
    } else {
      const result = (await res.json()) as ErrorResponse;
      throw new Error(result.massage);
    }
  } catch (err) {
    const error = err as Error;
    dispatch(myselfAction.getUser.failed({ error, params: {} }));
  }
};

export default myselfAction;
