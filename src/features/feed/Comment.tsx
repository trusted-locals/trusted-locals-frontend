import React, { FC } from 'react';
import { Box, Text } from '@chakra-ui/core';

import { PostInfo } from './PostInfo';

import { Comment as CommentType } from './feedSlice';

type Props = {} & CommentType;

export const Comment: FC<Props> = ({ comment, date, userImageURL, username }: Props) => (
  <Box marginBottom={6} padding={4} shadow='sm'>
    <Text fontSize='sm'>{comment}</Text>
    <PostInfo date={date} userImageURL={userImageURL} username={username} />
  </Box>
);
