import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Icon, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/core';

import { selectProfile } from '../user/userSlice';

import { AppRoutes } from '../../app/router';
import { responsiveBoxProps } from '../../app/styles';

type Props = {};

const INPUT_PLACEHOLDER = 'Use keywords to search for information';

const Location: FC<{}> = () => {
  const profile = useSelector(selectProfile);

  if (profile === null) {
    return null;
  }

  return (
    <Text as='a' fontWeight='semibold' textDecoration='underline'>
      {profile.cityName}
    </Text>
  );
};

export const FeedHeader: FC<Props> = (_props: Props) => {
  const profile = useSelector(selectProfile);

  if (profile === null) {
    return (
      <Box {...responsiveBoxProps}>
        <p>Sign in to vote and contribute.</p>
        <RouterLink to={'/account/login' as AppRoutes}>
          <Button marginTop={4} size='sm' variantColor='blue'>
            Sign in
          </Button>
        </RouterLink>
      </Box>
    );
  }

  return (
    <Box paddingX={4}>
      <Text color='gray.600' fontSize='lg'>
        Good morning, {profile.firstName || profile.cityName}
      </Text>
      <Text color='gray.600' fontSize='lg' marginTop={1}>
        Here are the latest for <Location />
      </Text>
      <InputGroup marginTop={4}>
        <InputLeftElement>
          <Icon color='gray.400' name='search' />
        </InputLeftElement>
        <Input placeholder={INPUT_PLACEHOLDER} type='text' />
      </InputGroup>
    </Box>
  );
};
