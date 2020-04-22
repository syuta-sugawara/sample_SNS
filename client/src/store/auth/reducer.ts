import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { CredentialType } from '../../types/auth';
import authAction from './actions';

export type StateType = CredentialType & {
  loading: boolean;
  error?: Error;
};

const initialState: StateType = { token: '', refreshToken: '', loading: false };

const authReducer = reducerWithInitialState(initialState)
  // signup
  .case(authAction.signup.started, state => ({
    ...state,
    loading: true,
  }))
  .case(authAction.signup.done, state => ({
    ...state,
    loading: false,
  }))
  .case(authAction.signup.failed, (state, payload) => ({
    ...state,
    loading: false,
    error: payload.error,
  }))

  //signin
  .case(authAction.signin.started, state => ({
    ...state,
    loading: true,
  }))
  .case(authAction.signin.done, (state, payload) => ({
    ...state,
    ...payload.result,
    loading: false,
  }))
  .case(authAction.signin.failed, (state, payload) => ({
    ...state,
    loading: false,
    error: payload.error,
  }))

  // getTokenFromLocal
  .case(authAction.getTokenFromLocal.started, state => ({
    ...state,
  }))
  .case(authAction.getTokenFromLocal.done, (state, payload) => ({
    ...state,
    token: payload.result.token,
  }))
  .case(authAction.getTokenFromLocal.failed, (state, payload) => ({
    ...state,
    error: payload.error,
  }));

export default authReducer;
