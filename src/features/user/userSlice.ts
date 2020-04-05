import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetch } from '../../utils/fetch';

import { AppRoutes, history } from '../../app/router';
import { AppDispatch, RootState } from '../../app/store';

import { PROFILE_IMAGE_EMILY_ROSE28, PROFILE_IMAGE_OLIVER_MICKE } from '../feed/mocks';

import { Post, requestedPostsByIDs } from '../feed/feedSlice';

const SLICE_NAME = 'user';

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
  postIDs: Post['postID'][];
  rating: number;
  username: string;
  imageURL?: string;
};

export type OtherProfile = {
  cityName: string;
  firstName?: string;
  lastName?: string;
  postsCount: number;
  postIDs: Post['postID'][];
  rating: number;
  username: string;
  imageURL?: string;
};

type State = {
  async: AsyncState;
  isLoggedIn: boolean;
  profile: {
    async: AsyncState;
    profile: Profile | null;
  };
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

const OPENED_OWN_PROFILE_PENDING = `${SLICE_NAME}/ownProfile/pending`;
const OPENED_OWN_PROFILE_FULFILLED = `${SLICE_NAME}/ownProfile/fulfilled`;
const OPENED_OWN_PROFILE_REJECTED = `${SLICE_NAME}/ownProfile/rejected`;

const MOCKED_OWN_PROFILE: Profile = {
  cityName: 'Richmond',
  email: 'foo@bar.com',
  firstName: 'Oliver',
  lastName: 'Micke',
  postsCount: 4,
  postIDs: [1, 2, 4, 5],
  rating: 49,
  username: 'olivermicke',
  imageURL: PROFILE_IMAGE_OLIVER_MICKE,
};

const MOCKED_OTHER_PROFILES: { [key: string]: OtherProfile } = {
  emily_rose28: {
    cityName: 'Richmond',
    rating: 78,
    postsCount: 2,
    postIDs: [3, 6],
    username: 'emily_rose28',
    imageURL: PROFILE_IMAGE_EMILY_ROSE28,
  },
};

export const loggedIn = createAsyncThunk(`${SLICE_NAME}/loggedIn`, (body: LoginBody) =>
  fetch<LoginSuccess>('/user/login', {
    body: JSON.stringify(body),
    method: 'POST',
  }).then((data) => {
    history.push('/feed' as AppRoutes);
    return data;
  }),
);

export const registered = createAsyncThunk(`${SLICE_NAME}/registered`, (body: RegistrationBody) =>
  fetch<RegistrationSuccess>('/user', {
    body: JSON.stringify(body),
    method: 'POST',
  }).then((data) => {
    history.push('/feed' as AppRoutes);
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
    // Preliminary
    isLoggedIn: true,
    profile: {
      async: {
        error: null,
        loading: 'idle',
      },
      profile: MOCKED_OWN_PROFILE,
    },
    otherProfile: {
      async: {
        error: null,
        loading: 'idle',
      },
      profile: null,
    },
  } as State,
  reducers: {
    loggedOut: (state): void => {
      state.profile.profile = null;
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
          async: {
            error: null,
            loading: 'idle',
          },
          profile: MOCKED_OWN_PROFILE,
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
        state.profile.profile = MOCKED_OWN_PROFILE;
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
    [OPENED_OWN_PROFILE_PENDING]: (state): void => {
      state.profile.async.error = null;
      state.profile.async.loading = 'pending';
    },
    [OPENED_OWN_PROFILE_FULFILLED]: (state, action: PayloadAction<{ profile: Profile }>): void => {
      state.profile.async.loading = 'idle';
      state.profile.profile = action.payload.profile;
    },
    [OPENED_OWN_PROFILE_REJECTED]: (state, action: { error: Error }): void => {
      state.profile.async.loading = 'idle';
      state.profile.async.error = action.error.message;
    },
  },
});

const thunks = {
  requestedPostsOfUser: function ({ isOwnProfile, userNameParam }: { isOwnProfile: boolean; userNameParam: string }) {
    return (dispatch: AppDispatch, _getState: () => RootState): void => {
      Promise.resolve({ profile: isOwnProfile ? MOCKED_OWN_PROFILE : MOCKED_OTHER_PROFILES[userNameParam] })
        .then(({ profile }) => {
          dispatch(requestedPostsByIDs(profile.postIDs));

          dispatch({
            type: OPENED_OWN_PROFILE_FULFILLED,
            payload: {
              profile,
            },
          });
        })
        .catch((error: Error) => {
          dispatch({ error, type: OPENED_OWN_PROFILE_REJECTED });
        });
    };
  },
};

export const { loggedOut, requestedPostsOfUser } = { ...slice.actions, ...thunks };

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

export const selectOtherProfile = (state: RootState): State['otherProfile'] =>
  createSelector(
    (state: RootState) => state.user.otherProfile,
    (otherProfile) => otherProfile,
  )(state);

export const selectOwnProfile = (state: RootState): State['profile'] =>
  createSelector(
    (state: RootState) => state.user.profile,
    (profile) => profile,
  )(state);

export const selectOwnUsername = (state: RootState): string | null =>
  createSelector(
    (state: RootState) => {
      if (!state.user.profile || !state.user.profile.profile) {
        return null;
      }

      return state.user.profile.profile.username;
    },
    (username) => username,
  )(state);

export const userReducer = slice.reducer;
