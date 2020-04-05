import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';

import { MOCKED_CATEGORIES, MOCKED_POSTS } from './mocks';

const SLICE_NAME = 'feed';

type AsyncState = {
  error: string | null;
  loading: 'idle' | 'pending';
};

export type Category = 'news' | 'medical_supply' | 'grocery' | 'advice';

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

export type Posts = { [key in Post['postID']]: Post };

export type Categories = { [key in Category]: { async: AsyncState; postIDs: number[] | null } };

type State = {
  categories: Categories;
  posts: {
    [key in Post['postID']]: {
      async: AsyncState;
      post: Post | null;
    };
  };
};

export const loadRequested = createAsyncThunk(`${SLICE_NAME}/loadRequested`, (category: Category) =>
  Promise.resolve({ posts: MOCKED_CATEGORIES[category] }),
);

export const postRequested = createAsyncThunk(`${SLICE_NAME}/postRequested`, (postID: Post['postID']) =>
  Promise.resolve({ post: MOCKED_POSTS[postID] }),
);

const initialState: State = {
  categories: {
    advice: {
      async: { error: null, loading: 'idle' },
      postIDs: null,
    },
    grocery: {
      async: { error: null, loading: 'idle' },
      postIDs: null,
    },
    medical_supply: {
      async: { error: null, loading: 'idle' },
      postIDs: null,
    },
    news: {
      async: { error: null, loading: 'idle' },
      postIDs: null,
    },
  },
  posts: {},
};

export const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: {
    [loadRequested.pending.type]: (state, action): void => {
      // @ts-ignore
      const category: Category = action.meta.arg;

      const async = state.categories[category].async;
      async.loading = 'pending';
    },
    [loadRequested.fulfilled.type]: (state, action: PayloadAction<{ posts: Posts }>): void => {
      // @ts-ignore
      const categoryArg: Category = action.meta.arg;
      const category = state.categories[categoryArg];

      category.async.error = null;
      category.async.loading = 'idle';
      category.postIDs = Object.values(action.payload.posts).map((post) => post.postID);

      const normalizedPosts = Object.values(action.payload.posts).reduce(
        (acc, post) => ({
          ...acc,
          [post.postID]: {
            async: {
              error: null,
              loading: 'idle',
            },
            post,
          },
        }),
        {},
      );

      Object.assign(state.posts, normalizedPosts);
    },
    [loadRequested.rejected.type]: (state, action: { error: Error }): void => {
      // @ts-ignore
      const category: Category = action.meta.arg;

      const async = state.categories[category].async;
      async.loading = 'idle';
      async.error = action.error.message;
    },
    [postRequested.pending.type]: (state, action): void => {
      // @ts-ignore
      const postID: Post['postID'] = action.meta.arg;

      const post = state.posts[postID] ?? { async: {} };
      post.async.loading = 'pending';
      state.posts[postID] = post;
    },
    [postRequested.fulfilled.type]: (state, action: PayloadAction<{ post: Post }>): void => {
      // @ts-ignore
      const postID: Post['postID'] = action.meta.arg;
      const post = state.posts[postID];

      post.async.error = null;
      post.async.loading = 'idle';

      post.post = action.payload.post;
    },
    [postRequested.rejected.type]: (state, action: { error: Error }): void => {
      // @ts-ignore
      const postID: Post['postID'] = action.meta.arg;

      const post = state.posts[postID] ?? {};
      post.async = {
        error: action.error.message,
        loading: 'idle',
      };
      post.post = null;
      state.posts[postID] = post;
    },
  },
});

export const selectPostByID = (state: RootState, postID: number): State['posts'][Post['postID']] | null =>
  createSelector(
    (state: RootState) => state.feed.posts[postID] ?? null,
    (post) => post,
  )(state);

export const selectPostsByCategory = (
  state: RootState,
  category: Category,
): {
  async: AsyncState;
  posts: Posts | null;
} =>
  createSelector(
    (state: RootState) => {
      const postIDs = state.feed.categories[category].postIDs;

      const posts =
        postIDs === null
          ? null
          : Object.values(state.feed.posts).reduce((posts: Posts, { post }) => {
              if (post === null || !postIDs.includes(post.postID)) {
                return posts;
              }

              return {
                ...posts,
                [post.postID]: post,
              };
            }, {});

      return {
        async: state.feed.categories[category].async,
        posts,
      };
    },
    (categoryState) => categoryState,
  )(state);

export const feedReducer = slice.reducer;
