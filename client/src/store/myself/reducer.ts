import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { UserType } from '../../types/user';
import myselfAction from './actions';

export type StateType = UserType & {};

const initialState: StateType = {
  id: 'DragonTarodragon',
  screenName: 'DragonTaro',
  iconUrl:
    'https://pbs.twimg.com/profile_images/1136178449779810304/1e0ghs3t_400x400.jpg',
};

const myselfReducer = reducerWithInitialState(initialState).case(
  myselfAction.set,
  (state, payload) => {
    const { user } = payload;
    return {
      id: user.id,
      screenName: user.screenName,
      iconUrl: user.iconUrl,
    };
  }
);

export default myselfReducer;
