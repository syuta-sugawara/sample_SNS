import actionCreatorFactory from 'typescript-fsa';
import { Dispatch } from 'redux';

import { CredentialType, SigninType, SignupType } from '../../types/auth';
import { ActionTypes } from '../actionTypes';
import AuthAPI from '../../requests/auth';
import { ErrorResponse } from '../../types/errorResponse';
import { NextRouter } from 'next/router';
import modalAction from '../modal/actions';

const actionCreator = actionCreatorFactory();

const authAction = {
  signup: actionCreator.async<{}, {}, Error>(ActionTypes.execSignup),
  signin: actionCreator.async<{}, CredentialType, Error>(
    ActionTypes.execSignin
  ),
  signout: actionCreator.async<{}, {}, {}>(ActionTypes.execSignout),
  getTokenFromLocal: actionCreator.async<{}, { token: string }, Error>(
    ActionTypes.getTokenFromLocal
  ),
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
      const result = (await res.json()) as CredentialType;
      dispatch(authAction.signin.done({ result, params: {} }));
      dispatch(modalAction.hide());
      setLocalStorage(result);
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
  dispatch(authAction.signin.started({ params: {} }));
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
    dispatch(authAction.signin.failed({ error, params: {} }));
  }
};

export default authAction;