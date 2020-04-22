import { MakeStore } from 'next-redux-wrapper';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import modalReducer from './modal/reducer';
import myselfReducer from './myself/reducer';
import tweetReducer from './tweet/reducer';
import userReducer from './user/reducer';

const rootReducer = combineReducers({
  modal: modalReducer,
  myself: myselfReducer,
  tweet: tweetReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store: MakeStore = (preloadedState: RootState) => {
  return createStore(rootReducer, preloadedState, applyMiddleware(thunk));
};

export default store;
