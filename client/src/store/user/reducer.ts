import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { UserType } from '../../types/user';
import userAction from './actions';

export type StateType = UserType & {
  loading: boolean;
  error?: Error;
};

const initialState: StateType = {
  id: '',
  screenName: '',
  iconUrl: '',
  loading: false,
};

const userReducer = reducerWithInitialState(initialState)
  .case(userAction.get.started, state => ({
    ...state,
    loading: true,
    error: undefined,
  }))
  .case(userAction.get.done, (state, payload) => ({
    ...state,
    id: payload.result.id,
    screenName: payload.result.screenName,
    iconUrl: payload.result.iconUrl,
    loading: false,
    error: undefined,
  }))
  .case(userAction.get.failed, (state, payload) => ({
    ...state,
    loading: false,
    error: payload.error,
  }));

export default userReducer;
