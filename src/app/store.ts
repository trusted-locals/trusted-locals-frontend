import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { feedReducer } from '../features/feed/feedSlice';
import { submitReducer } from '../features/submit/submitSlice';
import { userReducer } from '../features/user/userSlice';

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  feed: feedReducer,
  submit: submitReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
