import actionCreatorFactory from 'typescript-fsa';
import { Dispatch } from 'redux';

import UserAPI from '../../requests/user';
import { UserType } from '../../types/user';
import { ErrorResponse } from '../../types/errorResponse';
import { ActionTypes } from '../actionTypes';

const actionCreator = actionCreatorFactory();

const userAction = {
  get: actionCreator.async<{}, UserType, Error>(ActionTypes.getUser),
};

export const fetchUser = (uid: string) => async (dispatch: Dispatch) => {
  dispatch(userAction.get.started({ params: {} }));
  const userAPI = new UserAPI();
  try {
    const res = await userAPI.getUser(uid);
    if (res.ok) {
      const result = (await res.json()) as UserType;
      dispatch(userAction.get.done({ result, params: {} }));
    } else {
      const result = (await res.json()) as ErrorResponse;
      throw new Error(result.massage);
    }
  } catch (err) {
    const error = err as Error;
    dispatch(userAction.get.failed({ error, params: {} }));
  }
};

export default userAction;
