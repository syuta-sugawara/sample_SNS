import { MakeStore } from 'next-redux-wrapper';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import modalReducer from './modal/reducer';
import tweetReducer from './tweet/reducer';
import userReducer from './user/reducer';
import authReducer from './auth/reducer';

const rootReducer = combineReducers({
  modal: modalReducer,
  tweet: tweetReducer,
  user: userReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store: MakeStore = (preloadedState: RootState) => {
  return createStore(rootReducer, preloadedState, applyMiddleware(thunk));
};

export default store;
