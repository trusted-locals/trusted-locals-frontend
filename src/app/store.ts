import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { counterReducer } from '../features/counter/counterSlice';

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  counter: counterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
