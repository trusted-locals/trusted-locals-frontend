import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetch } from '../../utils/fetch';

import { AppRoutes, history } from '../../app/router';
import { RootState } from '../../app/store';

const SLICE_NAME = 'user';
export const LOCAL_STORAGE_AUTH_TOKEN_KEY = 'token';

type AsyncState = {
  error: string | null;
  loading: 'idle' | 'pending';
};

export type Profile = {
  cityName: string;
  email: string;
  firstName?: string;
  lastName?: string;
  postsCount: number;
  rating: number;
  username: string;
  imageURL?: string;
};

export type OtherProfile = {
  cityName: string;
  firstName?: string;
  lastName?: string;
  postsCount: number;
  rating: number;
  username: string;
  imageURL?: string;
};

type State = {
  async: AsyncState;
  isLoggedIn: boolean;
  profile: Profile | null;
  otherProfile: {
    async: AsyncState;
    profile: OtherProfile | null;
  };
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
  token: string;
};

type OpenedOtherProfileBody = {
  username: string;
};

type OpenedOtherProfileSuccess = OtherProfile;

const MOCKED_OWN_PROFILE: Profile = {
  cityName: 'Richmond',
  email: 'foo@bar.com',
  firstName: 'Oliver',
  lastName: 'Micke',
  postsCount: 7,
  rating: 79,
  username: 'olivermicke',
  imageURL: process.env.PUBLIC_URL + '/img/oliver-micke.jpg',
};

const MOCKED_OTHER_PROFILES: { [key: string]: OtherProfile } = {
  emily_rose28: {
    cityName: 'Richmond',
    rating: 84,
    postsCount: 7,
    username: 'emily_rose28',
  },
};

export const loggedIn = createAsyncThunk(`${SLICE_NAME}/loggedIn`, (body: LoginBody) =>
  fetch<LoginSuccess>('/user/login', {
    body: JSON.stringify(body),
    method: 'POST',
  }).then((data) => {
    history.push('/feed' as AppRoutes);
    localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN_KEY, data.token);
    return data;
  }),
);

export const registered = createAsyncThunk(`${SLICE_NAME}/registered`, (body: RegistrationBody) =>
  fetch<RegistrationSuccess>('/user', {
    body: JSON.stringify(body),
    method: 'POST',
  }).then((data) => {
    history.push('/feed' as AppRoutes);
    localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN_KEY, data.token);
    return data;
  }),
);

export const openedOtherProfile = createAsyncThunk(
  `${SLICE_NAME}/openedOtherProfile`,
  ({ username }: OpenedOtherProfileBody) => Promise.resolve(MOCKED_OTHER_PROFILES[username]),
);

export const slice = createSlice({
  name: SLICE_NAME,
  initialState: {
    async: {
      error: null,
      loading: 'idle',
    },
    isLoggedIn: true,
    profile: MOCKED_OWN_PROFILE,
    otherProfile: {
      async: {
        error: null,
        loading: 'idle',
      },
      profile: null,
    },
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
        state.profile = MOCKED_OWN_PROFILE;
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
        state.profile = MOCKED_OWN_PROFILE;
      }
    },
    [registered.rejected.type]: (state, action: { error: Error }): void => {
      if (state.async.loading === 'pending') {
        state.async.loading = 'idle';
        state.async.error = action.error.message;
      }
    },
    [openedOtherProfile.pending.type]: (state): void => {
      state.otherProfile.async.error = null;
      state.otherProfile.async.loading = 'pending';
    },
    [openedOtherProfile.fulfilled.type]: (state, action: PayloadAction<OpenedOtherProfileSuccess>): void => {
      state.otherProfile.async.loading = 'idle';
      state.otherProfile.profile = action.payload;
    },
    [openedOtherProfile.rejected.type]: (state, action: { error: Error }): void => {
      state.otherProfile.async.loading = 'idle';
      state.otherProfile.async.error = action.error.message;
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

export const selectOtherProfile = (state: RootState): OtherProfile | null =>
  createSelector(
    (state: RootState) => state.user.otherProfile.profile,
    (otherProfile) => otherProfile,
  )(state);

export const selectOwnProfile = (state: RootState): Profile | null =>
  createSelector(
    (state: RootState) => state.user.profile,
    (profile) => profile,
  )(state);

export const selectOwnUsername = (state: RootState): string | null =>
  createSelector(
    (state: RootState) => state.user.profile?.username ?? null,
    (username) => username,
  )(state);

export const userReducer = slice.reducer;
