import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { CredentialType } from '../../types/auth';
import { UserType } from '../../types/user';
import { defaultIconUrl, defaultHeaderUrl } from '../../utils/image';
import authAction from './actions';

export type StateType = {
  currentUser: UserType;
  credentials: CredentialType;
  loading: boolean;
  error?: Error;
};

const initialState: StateType = {
  currentUser: {
    id: '',
    screenName: '',
    comment: '',
    iconUrl: '',
    headerUrl: '',
    followIDs: [],
    followedIDs: [],
  },
  credentials: {
    token: '',
    refreshToken: '',
  },
  loading: false,
};

const authReducer = reducerWithInitialState(initialState)
  // signup
  .case(authAction.signup.started, state => ({
    ...state,
    loading: true,
  }))
  .case(authAction.signup.done, (state, payload) => ({
    ...state,
    ...payload.result.credentials,
    currentUser: {
      ...payload.result.currentUser,
      iconUrl: !payload.result.currentUser.iconUrl
        ? defaultIconUrl
        : payload.result.currentUser.iconUrl,
      headerUrl: !payload.result.currentUser.headerUrl
        ? defaultHeaderUrl
        : payload.result.currentUser.headerUrl,
    },
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
    ...payload.result.credentials,
    currentUser: {
      ...payload.result.currentUser,
      iconUrl: !payload.result.currentUser.iconUrl
        ? defaultIconUrl
        : payload.result.currentUser.iconUrl,
      headerUrl: !payload.result.currentUser.headerUrl
        ? defaultHeaderUrl
        : payload.result.currentUser.headerUrl,
    },
    loading: false,
  }))
  .case(authAction.signin.failed, (state, payload) => ({
    ...state,
    loading: false,
    error: payload.error,
  }))

  //signout
  .case(authAction.signout.started, state => ({
    ...state,
  }))
  .case(authAction.signout.done, state => ({
    ...state,
    credentials: {
      token: '',
      refreshToken: '',
    },
  }))

  // getTokenFromLocal
  .case(authAction.getTokenFromLocal.started, state => ({
    ...state,
    loading: true,
  }))
  .case(authAction.getTokenFromLocal.done, (state, payload) => ({
    ...state,
    loading: false,
    credentials: {
      token: payload.result.token,
      refreshToken: '',
    },
  }))
  .case(authAction.getTokenFromLocal.failed, (state, payload) => ({
    ...state,
    loading: false,
    error: payload.error,
  }))

  // getCurrentUSer
  .case(authAction.getUser.started, state => ({
    ...state,
    loading: true,
    error: undefined,
  }))
  .case(authAction.getUser.done, (state, payload) => ({
    ...state,
    currentUser: {
      ...payload.result,
      iconUrl: !payload.result.iconUrl
        ? defaultIconUrl
        : payload.result.iconUrl,
      headerUrl: !payload.result.headerUrl
        ? defaultHeaderUrl
        : payload.result.headerUrl,
    },
    loading: false,
    error: undefined,
  }))
  .case(authAction.getUser.failed, (state, payload) => ({
    ...state,
    loading: false,
    error: payload.error,
  }));

export default authReducer;
