import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { feedReducer } from '../features/feed/feedSlice';
import { submitReducer } from '../features/submit/submitSlice';
import { userReducer } from '../features/user/userSlice';

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: 'root',
  storage,
  // TODO: Preliminary
  blacklist: ['feed', 'profile', 'submit', 'user'],
};

const rootReducer = combineReducers({
  feed: feedReducer,
  submit: submitReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
