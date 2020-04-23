import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { UserType } from '../../types/user';
import { defaultIconUrl } from '../../utils/image';
import myselfAction from './actions';

export type StateType = UserType & {
  loading: boolean;
  error?: Error;
};

const initialState: StateType = {
  id: '',
  screenName: '',
  iconUrl: '',
  followIDs: [],
  followedIDs: [],
  loading: false,
};

const myselfReducer = reducerWithInitialState(initialState)
  .case(myselfAction.getUser.started, state => ({
    ...state,
    loading: true,
    error: undefined,
  }))
  .case(myselfAction.getUser.done, (state, payload) => ({
    ...state,
    id: payload.result.id,
    screenName: payload.result.screenName,
    iconUrl: !payload.result.iconUrl ? defaultIconUrl : payload.result.iconUrl,
    followIDs: payload.result.followIDs,
    followedIDs: payload.result.followedIDs,
    loading: false,
    error: undefined,
  }))
  .case(myselfAction.getUser.failed, (state, payload) => ({
    ...state,
    loading: false,
    error: payload.error,
  }));

export default myselfReducer;
