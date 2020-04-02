import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';

const SLICE_NAME = 'feed';

type AsyncState = {
  error: string | null;
  loading: 'idle' | 'pending';
};

export type Category = 'news' | 'medical_supply' | 'grocery' | 'advice';

const CATEGORIES: Category[] = ['advice', 'grocery', 'medical_supply', 'news'];

export type Post = {
  postID: number;
  categories: Category[];
  date: number;
  imageURL: string | null;
  rating: number | null;
  text: string;
  title: string;
  userImageURL: string | null;
  username: string;
};

type Categories = { [key in Category]: { async: AsyncState; posts: { [postID: number]: Post } | null } };

type State = {
  categories: Categories;
};

const generateRandomDate = (): number => new Date().setHours(new Date().getHours() - 2);

const MOCKED_CATEGORIES: { [category in Category]: { [postID: number]: Post } } = {
  news: {
    1: {
      categories: ['news'],
      date: generateRandomDate(),
      postID: 1,
      rating: 74,
      text:
        'Service disconnection has been suspended. Lorem ipsum dolor sit amet. Amet sit dolor ipsum lorem? Lorem ipsum dolor sit amet!',
      title: 'Service disconnection has been suspended',
      username: 'emily_rose28',
      imageURL: 'https://via.placeholder.com/350x150',
      userImageURL: 'https://via.placeholder.com/350x150',
    },
  },
  medical_supply: {},
  advice: {},
  grocery: {},
};

export const loadRequested = createAsyncThunk(`${SLICE_NAME}/loadRequested`, (category: Category) =>
  Promise.resolve(MOCKED_CATEGORIES[category]),
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
    [loadRequested.pending.type]: (state, action): void => {
      // @ts-ignore
      const category: Category = action.meta.arg;

      const async = state.categories[category].async;

      if (async.loading === 'idle') {
        async.loading = 'pending';
      }
    },
    [loadRequested.fulfilled.type]: (state, action: PayloadAction<{ [postID: number]: Post }>): void => {
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
