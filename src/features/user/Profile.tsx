import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Button, Divider, Image, Text } from '@chakra-ui/core';

import {
  LOCAL_STORAGE_AUTH_TOKEN_KEY,
  loggedOut,
  selectOtherProfile,
  selectOwnProfile,
  Profile as ProfileType,
  OtherProfile,
} from './userSlice';

import { responsiveBoxProps } from '../../app/styles';

import { RootState } from '../../app/store';

export const Profile: FC<{}> = () => {
  const history = useHistory();

  const userNameParam: string | undefined = history.location.pathname.split('/profile/')[1];
  const isOwnProfile = userNameParam === 'me' || userNameParam === undefined || userNameParam === '';
  const username = isOwnProfile ? 'me' : userNameParam;

  const selector: (state: RootState) => (ProfileType | null) | (OtherProfile | undefined) = isOwnProfile
    ? selectOwnProfile
    : selectOtherProfile(username);

  const dispatch = useDispatch();
  const profile = useSelector(selector);

  if (!profile) {
    // TODO: Fetch profile.
    return <h3>Should fetch data here. Will do that later.</h3>;
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
      {isOwnProfile && (
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
      )}
    </Box>
  );
};
