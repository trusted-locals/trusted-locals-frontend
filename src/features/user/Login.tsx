import React, { FC, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, AlertIcon, Box, Button, FormControl, FormLabel, Heading, Input, Link } from '@chakra-ui/core';

import { PasswordInput } from '../../components/PasswordInput';

import { loggedIn, selectAsync } from './userSlice';

import { responsiveBoxProps } from '../../app/styles';

import { AppRoutes } from '../../app/router';

const MIN_LENGTH_USERNAME = 3;
const MAX_LENGTH_USERNAME = 64;

const containerStyles = {
  marginTop: 4,
};

export const Login: FC<{}> = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector(selectAsync);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <Box {...responsiveBoxProps} maxWidth='500px'>
      <Heading as='h2'>Login</Heading>
      <Box marginTop={8}>
        <form
          onSubmit={(e): void => {
            e.preventDefault();

            dispatch(loggedIn({ name, password }));
          }}
        >
          <FormControl {...containerStyles}>
            <FormLabel htmlFor='username'>Username</FormLabel>
            <Input
              id='username'
              isRequired
              maxLength={MAX_LENGTH_USERNAME}
              minLength={MIN_LENGTH_USERNAME}
              // @ts-ignore
              onChange={({ target }): void => {
                setName(target.value);
              }}
              type='text'
              value={name}
            />
          </FormControl>
          <PasswordInput
            containerStyles={containerStyles}
            isPasswordVisible={isPasswordVisible}
            password={password}
            setIsPasswordVisible={setIsPasswordVisible}
            setPassword={setPassword}
          />
          <Box display='flex' justifyContent='space-between' marginTop={6}>
            <Button isLoading={loading === 'pending'} type='submit' variantColor='green'>
              Login
            </Button>
            <Link alignItems='center' as='span' display='flex'>
              <RouterLink to={'/account/reset-password' as AppRoutes}>
                <Button variant='link' size='sm'>
                  Forgot password?
                </Button>
              </RouterLink>
            </Link>
          </Box>
        </form>
        {error && (
          <Alert marginTop={6} status='error' variant='left-accent'>
            <AlertIcon />
            {error}
          </Alert>
        )}
      </Box>
      <Box marginTop={12}>
        Don&apos;t have an account yet?{' '}
        <RouterLink to={'/account/register' as AppRoutes}>
          <Link as='span' color='green.500' fontWeight='semibold'>
            Create one here.
          </Link>
        </RouterLink>
      </Box>
    </Box>
  );
};
