import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';

const SLICE_NAME = 'feed';

type AsyncState = {
  error: string | null;
  loading: 'idle' | 'pending';
};

export type Category = 'news' | 'medical_supply' | 'grocery' | 'advice';

const CATEGORIES: Category[] = ['advice', 'grocery', 'medical_supply', 'news'];

type Post = {
  category: Category;
  date: string;
  imageURL?: string;
  rating: number;
  text: string;
  title: string;
  userImageURL?: string;
  username: number;
};

type Categories = { [key in Category]: { async: AsyncState; posts: Post[] | null } };

type State = {
  categories: Categories;
};

export const loadRequested = createAsyncThunk(`${SLICE_NAME}/loadRequested`, (category: Category) =>
  Promise.resolve([
    {
      a: true,
    },
  ]),
);

export const slice = createSlice({
  name: SLICE_NAME,
  initialState: {
    categories: CATEGORIES.reduce(
      (acc, category: Category) => ({
        ...acc,
        [category]: {
          async: {
            error: null,
            loading: 'idle',
          },
          posts: null,
        },
      }),
      {} as Categories,
    ),
  } as State,
  reducers: {},
  extraReducers: {
    [loadRequested.pending.type]: (state, action: any): void => {
      // @ts-ignore
      const category: Category = action.meta.arg;

      const async = state.categories[category].async;

      if (async.loading === 'idle') {
        async.loading = 'pending';
      }
    },
    [loadRequested.fulfilled.type]: (state, action: PayloadAction<Post[]>): void => {
      // @ts-ignore
      const category: Category = action.meta.arg;

      const feed = state.categories[category];
      const async = feed.async;

      if (async.loading === 'pending') {
        async.loading = 'idle';
        feed.posts = action.payload;
      }
    },
    [loadRequested.rejected.type]: (state, action: { error: Error }): void => {
      // @ts-ignore
      const category: Category = action.meta.arg;

      const async = state.categories[category].async;

      if (async.loading === 'pending') {
        async.loading = 'idle';
        async.error = action.error.message;
      }
    },
  },
});

export const selectByCategory = (state: RootState, category: Category): State['categories'][Category] =>
  createSelector(
    (state: RootState) => state.feed.categories,
    (categories) => categories[category],
  )(state);

export const feedReducer = slice.reducer;
