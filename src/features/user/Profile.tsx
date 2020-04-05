import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Avatar, Box, Button, Divider, Text } from '@chakra-ui/core';

import {
  LOCAL_STORAGE_AUTH_TOKEN_KEY,
  loggedOut,
  openedOtherProfile,
  selectOtherProfile,
  selectOwnProfile,
  selectOwnUsername,
} from './userSlice';

import { responsiveBoxProps } from '../../app/styles';

export const Profile: FC<{}> = () => {
  const dispatch = useDispatch();

  const ownUsername: string | null = useSelector(selectOwnUsername);

  const history = useHistory();
  // TODO: Refactor
  const userNameParam: string | undefined = history.location.pathname.split('/profile/')[1];
  const isOwnProfile = ownUsername === userNameParam || userNameParam === 'me';

  const profileSelector = isOwnProfile ? selectOwnProfile : selectOtherProfile;
  const profile = useSelector(profileSelector);

  useEffect(() => {
    if (!profile) {
      dispatch(openedOtherProfile({ username: userNameParam }));
    }
  }, [dispatch, profile, userNameParam]);

  if (!profile) {
    // TODO: Fetch profile.
    return <h3>Should fetch data here. Will do that later.</h3>;
  }

  return (
    <Box {...responsiveBoxProps}>
      <Box>
        <Box alignItems='center' display='flex' flexDirection='column' marginTop={8}>
          <Avatar size='lg' name={profile.username} src={profile.imageURL ?? ''} />
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
      {/* TODO: Posts of user. If no posts, show text. */}
      {/* // TODO: Preliminary */}
      {isOwnProfile && false && (
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
