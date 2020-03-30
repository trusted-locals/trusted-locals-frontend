import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetch } from '../../utils/fetch';

import { RootState } from '../../app/store';

const SLICE_NAME = 'user';
export const LOCAL_STORAGE_AUTH_TOKEN_KEY = 'token';

type AsyncState = {
  error: string | null;
  loading: 'idle' | 'pending';
};

type State = {
  async: AsyncState;
  isLoggedIn: boolean;
  profile: {
    cityName: string;
    email: string;
    firstName?: string;
    lastName?: string;
    username: string;
  } | null;
};

type LoginBody = {
  name: string;
  password: string;
};

type LoginSuccess = {
  success: boolean;
  token: string;
};

type RegistrationBody = {
  country: string;
  email: string;
  name: string;
  password: string;
};

type RegistrationSuccess = {
  success: boolean;
};

export const loggedIn = createAsyncThunk(
  `${SLICE_NAME}/loggedIn`,
  ({ body, onSuccess }: { body: LoginBody; onSuccess: () => void }) =>
    fetch<LoginSuccess>('/user/login', {
      body: JSON.stringify(body),
      method: 'POST',
    }).then((data) => {
      onSuccess();
      localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN_KEY, data.token);
      return data;
    }),
);

export const registered = createAsyncThunk(
  `${SLICE_NAME}/registered`,
  ({ body, onSuccess }: { body: RegistrationBody; onSuccess: () => void }) =>
    fetch<RegistrationSuccess>('/user', {
      body: JSON.stringify(body),
      method: 'POST',
    }).then((data) => {
      onSuccess();
      return data;
    }),
);

export const slice = createSlice({
  name: SLICE_NAME,
  initialState: {
    async: {
      error: null,
      loading: 'idle',
    },
    isLoggedIn: false,
    profile: null,
  } as State,
  reducers: {
    authTokenChecked: (state, action: PayloadAction<{ authTokenExists: boolean }>): void => {
      state.isLoggedIn = action.payload.authTokenExists;
    },
    loggedOut: (state): void => {
      state.profile = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: {
    [loggedIn.pending.type]: (state): void => {
      if (state.async.loading === 'idle') {
        state.async.loading = 'pending';
      }
    },
    [loggedIn.fulfilled.type]: (state, _action: PayloadAction<LoginSuccess>): void => {
      if (state.async.loading === 'pending') {
        state.async.loading = 'idle';
        state.isLoggedIn = true;
        // TODO: Receive profile data from BE
        state.profile = {
          cityName: 'Richmond',
          email: 'foo@bar.com',
          username: 'foo_bar_123',
          firstName: 'Timothy',
          lastName: 'Doe',
        };
      }
    },
    [loggedIn.rejected.type]: (state, action: { error: Error }): void => {
      if (state.async.loading === 'pending') {
        state.async.loading = 'idle';
        state.async.error = action.error.message;
      }
    },
    [registered.pending.type]: (state): void => {
      if (state.async.loading === 'idle') {
        state.async.loading = 'pending';
      }
    },
    [registered.fulfilled.type]: (state, _action: PayloadAction<RegistrationSuccess>): void => {
      if (state.async.loading === 'pending') {
        state.async.loading = 'idle';
        state.isLoggedIn = true;
        // TODO: Receive profile data from BE
        state.profile = {
          cityName: 'Richmond',
          email: 'foo@bar.com',
          username: 'foo_bar_123',
          firstName: 'Timothy',
          lastName: 'Doe',
        };
      }
    },
    [registered.rejected.type]: (state, action: { error: Error }): void => {
      if (state.async.loading === 'pending') {
        state.async.loading = 'idle';
        state.async.error = action.error.message;
      }
    },
  },
});

export const { authTokenChecked, loggedOut } = slice.actions;

export const selectAsync = (state: RootState): State['async'] =>
  createSelector(
    (state: RootState) => state.user.async,
    (async) => async,
  )(state);

export const selectIsLoggedIn = (state: RootState): State['isLoggedIn'] =>
  createSelector(
    (state: RootState) => state.user.isLoggedIn,
    (isLoggedIn) => isLoggedIn,
  )(state);

export const selectProfile = (state: RootState): State['profile'] =>
  createSelector(
    (state: RootState) => state.user.profile,
    (profile) => profile,
  )(state);

export const userReducer = slice.reducer;
