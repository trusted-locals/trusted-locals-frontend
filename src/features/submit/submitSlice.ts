import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetch } from '../../utils/fetch';

import { AppRoutes, history } from '../../app/router';
import { RootState } from '../../app/store';

const SLICE_NAME = 'submit';

type AsyncState = {
  error: string | null;
  loading: 'idle' | 'pending';
};

type State = {
  async: AsyncState;
};

type SubmitBody = {
  image: string | null;
  text: string;
  title: string;
};

type SubmitSuccess = {
  success: boolean;
};

export const submitted = createAsyncThunk(`${SLICE_NAME}/submitted`, (body: SubmitBody) =>
  fetch<SubmitSuccess>('/TODO:Route', {
    body: JSON.stringify(body),
    method: 'POST',
  }).then((data) => {
    history.push('/feed' as AppRoutes);
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
  } as State,
  reducers: {},
  extraReducers: {
    [submitted.pending.type]: (state): void => {
      if (state.async.loading === 'idle') {
        state.async.loading = 'pending';
      }
    },
    [submitted.fulfilled.type]: (state, _action: PayloadAction<SubmitSuccess>): void => {
      if (state.async.loading === 'pending') {
        state.async.loading = 'idle';
      }
    },
    [submitted.rejected.type]: (state, action: { error: Error }): void => {
      if (state.async.loading === 'pending') {
        state.async.loading = 'idle';
        state.async.error = action.error.message;
      }
    },
  },
});

export const selectAsync = (state: RootState): State['async'] =>
  createSelector(
    (state: RootState) => state.submit.async,
    (async) => async,
  )(state);

export const submitReducer = slice.reducer;