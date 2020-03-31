import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@chakra-ui/core';

import { Category, loadRequested, selectByCategory } from './feedSlice';

import { RootState } from '../../app/store';

type Props = {
  category: Category;
};

export const Feed: FC<Props> = ({ category }: Props) => {
  const dispatch = useDispatch();
  const { async, posts } = useSelector((state: RootState) => selectByCategory(state, category));

  useEffect(() => {
    if (posts === null) {
      dispatch(loadRequested(category));
    }
  }, [category, dispatch, posts]);

  if (async.error) {
    // TODO:
    return <h1>An error occured</h1>;
  }

  if (async.loading === 'pending') {
    // TODO:
    return <h1>Loading...</h1>;
  }

  return <Box paddingX={4}>{category} feed</Box>;
};
