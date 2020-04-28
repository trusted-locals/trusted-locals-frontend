import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@chakra-ui/core';

import { Post } from './Post';
import { Category, loadRequested, Post as PostType, selectPostsByCategory, selectSearchValue } from './feedSlice';

import { RootState } from '../../app/store';

type Props = {
  category: Category;
};

const filteredPosts = (posts: PostType[], searchValue: string): PostType[] =>
  posts.filter((post) => post.title.toLowerCase().includes(searchValue));

const sortedPosts = (posts: PostType[]): PostType[] => posts.sort((postA, postB) => (postA.date > postB.date ? -1 : 1));

const filteredAndSortedPosts = (posts: PostType[], searchValue: string): PostType[] =>
  sortedPosts(filteredPosts(posts, searchValue));

export const Feed: FC<Props> = ({ category }: Props) => {
  const dispatch = useDispatch();
  const { async, posts } = useSelector((state: RootState) => selectPostsByCategory(state, category));
  const searchValue = useSelector(selectSearchValue);

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
    <Box
      display='grid'
      gridTemplateColumns={['100%', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']}
      gridGap={8}
      marginTop={8}
    >
      {filteredAndSortedPosts(Object.values(posts), searchValue).map((post: PostType) => (
        <Post key={post.postID} {...post} />
      ))}
    </Box>
  );
};
