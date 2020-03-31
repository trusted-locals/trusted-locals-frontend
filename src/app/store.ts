import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { submitReducer } from '../features/submit/submitSlice';
import { userReducer } from '../features/user/userSlice';

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['submit', 'user'],
};

const userPersistConfig = {
  key: 'user',
  storage: storage,
  whitelist: ['profile'],
};

const rootReducer = combineReducers({
  submit: submitReducer,
  user: persistReducer(userPersistConfig, userReducer),
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
