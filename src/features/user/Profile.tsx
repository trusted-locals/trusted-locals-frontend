import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Box, Button, Divider, Image, Text } from '@chakra-ui/core';

import { LOCAL_STORAGE_AUTH_TOKEN_KEY, loggedOut, selectProfile } from './userSlice';

import { responsiveBoxProps } from '../../app/styles';

type Props = {} & RouteComponentProps;

const PureProfile: FC<Props> = ({ history }: Props) => {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);

  if (profile === null) {
    // TODO: Fetch profile.
    return null;
  }

  return (
    <Box {...responsiveBoxProps}>
      <Box>
        <Box alignItems='center' display='flex' flexDirection='column' marginTop={8}>
          <Image
            alt='profile image'
            border='1px solid'
            borderColor='gray.400'
            rounded='full'
            size='64px'
            src='https://via.placeholder.com/64'
          />
          <Text color='gray.600' fontWeight='semibold' marginTop={2}>
            {profile.firstName ? `${profile.firstName} ${profile.lastName}` : profile.username}
          </Text>
          <Text color='gray.500'>{profile.cityName}</Text>
        </Box>
        <Box color='gray.500' display='flex' justifyContent='center' marginTop={4}>
          <Box marginRight={6}>
            <Text textAlign='center'>{profile.postsCount}</Text>
            <Text>Posts</Text>
          </Box>
          <Box>
            <Text textAlign='center'>{profile.rating}%</Text>
            <Text>Rating</Text>
          </Box>
        </Box>
      </Box>
      <Divider borderColor='gray.400' />
      <Box marginTop={8}>
        <Button
          onClick={(): void => {
            history.push('/account');
            localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
            dispatch(loggedOut());
          }}
          variant='ghost'
          variantColor='blue'
        >
          Log out
        </Button>
      </Box>
    </Box>
  );
};

export const Profile = withRouter(PureProfile);
