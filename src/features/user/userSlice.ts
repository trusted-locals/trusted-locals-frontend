import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { history } from '../../app/router';

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

export const loggedIn = createAsyncThunk(`${SLICE_NAME}/loggedIn`, (body: LoginBody) =>
  fetch<LoginSuccess>('/user/login', {
    body: JSON.stringify(body),
    method: 'POST',
  }).then((data) => {
    history.push('/');
    localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN_KEY, data.token);
    return data;
  }),
);

export const registered = createAsyncThunk(`${SLICE_NAME}/registered`, (body: RegistrationBody) =>
  fetch<RegistrationSuccess>('/user', {
    body: JSON.stringify(body),
    method: 'POST',
  }).then((data) => {
    history.push('/');
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
  } as State,
  reducers: {
    authTokenChecked: (state, action: PayloadAction<{ authTokenExists: boolean }>): void => {
      state.isLoggedIn = action.payload.authTokenExists;
    },
    loggedOut: (state): void => {
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

export const userReducer = slice.reducer;
