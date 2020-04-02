import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@chakra-ui/core';

import { Post } from './Post';
import { Category, loadRequested, Post as PostType, selectByCategory } from './feedSlice';

import { RootState } from '../../app/store';

type Props = {
  category: Category;
};

export const Feed: FC<Props> = ({ category }: Props) => {
  const dispatch = useDispatch();
  const { async, posts } = useSelector((state: RootState) => selectByCategory(state, category));

  useEffect(() => {
    if (async.error === null && posts === null) {
      dispatch(loadRequested(category));
    }
  }, [async, category, dispatch, posts]);

  if (async.error) {
    // TODO:
    return <h1>An error occured</h1>;
  }

  if (async.loading === 'pending') {
    // TODO:
    return <h1>Loading...</h1>;
  }

  if (posts === null) {
    return <>TODO: Loading state</>;
  }

  if (Object.keys(posts).length === 0) {
    return <>TODO: Empty state</>;
  }

  return (
    <Box paddingX={4}>
      {Object.values(posts).map((post: PostType) => (
        <Post key={post.postID} {...post} />
      ))}
    </Box>
  );
};
