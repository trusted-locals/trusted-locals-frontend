import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Avatar, BoxProps, Link as ChakraLink, Text } from '@chakra-ui/core';

import { AppRoutes } from '../app/router';
import { Post } from '../features/feed/feedSlice';

type Props = {
  style?: BoxProps;
  userImageURL: Post['userImageURL'];
  username: Post['username'];
};

// TS workaround
const Link: any = ChakraLink;

export const Author: FC<Props> = ({ style, userImageURL, username }: Props) => {
  const profilePath = ('/profile' as AppRoutes) + `/${username}`;

  return (
    <Link as={RouterLink} to={profilePath} style={style}>
      <Text as='span' color='blue.500' fontSize='sm'>
        {username}
      </Text>
      {userImageURL && <Avatar marginLeft={4} name={username} size='xs' src={userImageURL ?? ''} />}
    </Link>
  );
};
