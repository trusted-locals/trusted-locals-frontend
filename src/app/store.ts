import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../features/user/userSlice';

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
