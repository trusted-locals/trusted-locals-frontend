import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Box, Button } from '@chakra-ui/core';

import { LOCAL_STORAGE_AUTH_TOKEN_KEY, loggedOut } from './userSlice';

import { responsiveBoxProps } from '../../app/styles';

type Props = {} & RouteComponentProps;

const PureProfile: FC<Props> = ({ history }: Props) => {
  const dispatch = useDispatch();

  return (
    <Box {...responsiveBoxProps}>
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
  );
};

export const Profile = withRouter(PureProfile);
