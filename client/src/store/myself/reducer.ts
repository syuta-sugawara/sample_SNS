import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { UserType } from '../../types/user';
import myselfAction from './actions';

export type StateType = UserType & {};

const initialState: StateType = {
  id: 'DragonTarodragon',
  screenName: 'DragonTaro',
  iconUrl:
    'https://pbs.twimg.com/profile_images/1136178449779810304/1e0ghs3t_400x400.jpg',
  followIDs: [],
  followedIDs: [],
};

const myselfReducer = reducerWithInitialState(initialState).case(
  myselfAction.set,
  (state, payload) => {
    const { user } = payload;
    return {
      ...state,
      id: user.id,
      screenName: user.screenName,
      iconUrl: user.iconUrl,
      followIDs: user.followIDs,
      followedIDs: user.followedIDs,
    };
  }
);

export default myselfReducer;
