import { MakeStore } from 'next-redux-wrapper';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import countReducer from './counter/reducer';

const rootReducer = combineReducers({
  counter: countReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store: MakeStore = (preloadedState: RootState) => {
  return createStore(rootReducer, preloadedState, applyMiddleware(thunk));
};

export default store;
