import { NextRouter } from 'next/router';
import actionCreatorFactory from 'typescript-fsa';
import { Dispatch } from 'redux';

import AuthAPI from '../../requests/auth';
import UserAPI from '../../requests/user';
import {
  CredentialType,
  SigninType,
  SignupType,
  AuthResponseType,
} from '../../types/auth';
import { ErrorResponse } from '../../types/errorResponse';
import { UserType } from '../../types/user';
import modalAction from '../modal/actions';
import { ActionTypes } from '../actionTypes';
import { RootState } from '..';

const actionCreator = actionCreatorFactory();

const authAction = {
  signup: actionCreator.async<{}, {}, Error>(ActionTypes.execSignup),
  signin: actionCreator.async<{}, AuthResponseType, Error>(
    ActionTypes.execSignin
  ),
  signout: actionCreator.async<{}, {}, {}>(ActionTypes.execSignout),
  getTokenFromLocal: actionCreator.async<{}, { token: string }, Error>(
    ActionTypes.getTokenFromLocal
  ),
  getUser: actionCreator.async<{}, UserType, Error>(ActionTypes.getCurrentUser),
  // 余力があればrefreshTokenの実装をやる
  // getTokenFromRemote: actionCreator.async<{}, { token: string }, {}>(
  //   ActionTypes.getTokenFromRemote
  // ),
};

const getTokenFromLS = () => localStorage.getItem('token');

const setLocalStorage = (credential: Partial<CredentialType>) => {
  credential.token && localStorage.setItem('token', credential.token);
  credential.refreshToken &&
    localStorage.setItem('refreshToken', credential.refreshToken);
};

const clearLocalStorage = () => {
  localStorage.clear();
};

export const fetchSignin = (data: SigninType, router: NextRouter) => async (
  dispatch: Dispatch
) => {
  dispatch(authAction.signin.started({ params: {} }));
  const authAPI = new AuthAPI();
  try {
    const res = await authAPI.postSignin(data);
    if (res.ok) {
      const result = (await res.json()) as AuthResponseType;
      dispatch(authAction.signin.done({ result, params: {} }));
      dispatch(modalAction.hide());
      setLocalStorage(result.credentials);
      router.push('/home');
    } else {
      const result = (await res.json()) as ErrorResponse;
      throw new Error(result.massage);
    }
  } catch (err) {
    const error = err as Error;
    dispatch(authAction.signin.failed({ error, params: {} }));
  }
};

export const fetchSignup = (data: SignupType, router: NextRouter) => async (
  dispatch: Dispatch
) => {
  dispatch(authAction.signup.started({ params: {} }));
  const authAPI = new AuthAPI();
  try {
    const res = await authAPI.postSignup(data);
    if (res.ok) {
      // lambdaでの実行なら以下のコードでいける
      // const result = (await res.json()) as Pick<CredentialType, 'token'>;
      // dispatch(
      //   authAction.signup.done({ result: { token: result.token }, params: {} })
      // );
      // setLocalStorage(result);
      dispatch(modalAction.hide());
      router.push('/home');
    } else {
      const result = (await res.json()) as ErrorResponse;
      throw new Error(result.massage);
    }
  } catch (err) {
    const error = err as Error;
    dispatch(authAction.signup.failed({ error, params: {} }));
  }
};

export const asyncSignout = (router: NextRouter) => async (
  dispatch: Dispatch
) => {
  dispatch(authAction.signout.started({ params: {} }));
  clearLocalStorage();
  dispatch(authAction.signout.done({ result: {}, params: {} }));
  router.push('');
};

export const getTokenFromLocal = () => (dispatch: Dispatch) => {
  dispatch(authAction.getTokenFromLocal.started({ params: {} }));
  try {
    const token = getTokenFromLS();
    if (token) {
      dispatch(
        authAction.getTokenFromLocal.done({ result: { token }, params: {} })
      );
    } else {
      throw new Error('token is invalid');
    }
  } catch (err) {
    const error = err as Error;
    dispatch(authAction.getTokenFromLocal.failed({ error, params: {} }));
  }
};

export const fetchCurrentUser = () => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  dispatch(authAction.getUser.started({ params: {} }));
  const { auth } = getState();
  const userAPI = new UserAPI(auth.credentials.token);
  try {
    const res = await userAPI.getCurrentUser();
    if (res.ok) {
      const result = (await res.json()) as UserType;
      dispatch(authAction.getUser.done({ result, params: {} }));
    } else {
      const result = (await res.json()) as ErrorResponse;
      throw new Error(result.massage);
    }
  } catch (err) {
    const error = err as Error;
    dispatch(authAction.getUser.failed({ error, params: {} }));
  }
};

export default authAction;
