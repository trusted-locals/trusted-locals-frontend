import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Avatar, Box, Button, Divider, Text } from '@chakra-ui/core';

import { selectPostsByIDs } from '../feed/feedSlice';
import { Post } from '../feed/Post';
import {
  loggedOut,
  openedOtherProfile,
  requestedPostsOfUser,
  selectOtherProfile,
  selectOwnProfile,
  selectOwnUsername,
} from './userSlice';

import { responsiveBoxProps } from '../../app/styles';

import { RootState } from '../../app/store';

export const Profile: FC<{}> = () => {
  const dispatch = useDispatch();

  const ownUsername: string | null = useSelector(selectOwnUsername);

  const history = useHistory();
  // TODO: Refactor
  const userNameParam: string | undefined = history.location.pathname.split('/profile/')[1];
  const isOwnProfile = ownUsername === userNameParam || userNameParam === 'me';

  const profileSelector = isOwnProfile ? selectOwnProfile : selectOtherProfile;
  const profile = useSelector(profileSelector)?.profile ?? null;
  const posts = useSelector((state: RootState) => selectPostsByIDs(state, profile?.postIDs ?? []));

  useEffect(() => {
    dispatch(requestedPostsOfUser({ isOwnProfile, userNameParam: userNameParam ?? '' }));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!profile) {
      dispatch(openedOtherProfile({ username: userNameParam }));
    }
  });

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
            <Text textAlign='center'>{profile.rating}</Text>
            <Text>Rating</Text>
          </Box>
        </Box>
      </Box>
      <Divider borderColor='gray.400' />
      {/* NOTE: Copied. Refactor */}
      <Box
        display='grid'
        gridTemplateColumns={['100%', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']}
        gridGap={8}
        marginTop={8}
      >
        {Object.values(posts)
          .map(({ post }) => post)
          .map((post) => post && <Post key={post.postID} {...post} detailViewRedirectToProfile />)}
      </Box>
      {/* Preliminary */}
      {isOwnProfile && false && (
        <Box marginTop={8}>
          <Button
            onClick={(): void => {
              history.push('/account');
              dispatch(loggedOut());
            }}
            variant='ghost'
            variantColor='green'
          >
            Log out
          </Button>
        </Box>
      )}
    </Box>
  );
};
