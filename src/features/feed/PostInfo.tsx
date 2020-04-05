import React, { FC } from 'react';
import { Box, BoxProps, Divider, Text } from '@chakra-ui/core';

import { Author } from '../../components/Author';
import { TimeAgo } from '../../components/TimeAgo';

import { Post as PostType } from './feedSlice';

type Props = {
  date: PostType['date'];
  userImageURL: PostType['userImageURL'];
  username: PostType['username'];
  style?: BoxProps;
};

export const PostInfo: FC<Props> = ({ date, userImageURL, username, style }: Props) => (
  <Box alignItems='center' display='flex' marginTop={2} {...style}>
    <Text alignItems='center' as='span' color='gray.500' display='flex' fontSize='sm' fontWeight='normal' height='100%'>
      <TimeAgo date={new Date(date)} />
    </Text>
    <Divider borderColor='gray.300' height='24px' orientation='vertical' />
    <Author
      style={{
        alignItems: 'center',
        display: 'flex',
        height: '100%',
      }}
      userImageURL={userImageURL}
      username={username}
    />
  </Box>
);
