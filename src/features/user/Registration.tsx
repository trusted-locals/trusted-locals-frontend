import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { Alert, AlertIcon, Box, Button, FormControl, FormLabel, Heading, Input, Link } from '@chakra-ui/core';

import { registered, selectAsync } from './userSlice';

import { PasswordInput } from '../../components/PasswordInput';

import { responsiveBoxProps } from '../../app/styles';

import { AppRoutes } from '../../app/router';

const MIN_LENGTH_USERNAME = 3;
const MAX_LENGTH_USERNAME = 16;

const containerStyles = {
  marginTop: 4,
};

const PureRegistration: FC<{}> = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector(selectAsync);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <Box {...responsiveBoxProps} maxWidth='500px'>
      <Heading as='h2'>Register</Heading>
      <Box marginTop={8}>
        <form
          onSubmit={(e): void => {
            e.preventDefault();

            dispatch(
              registered({
                // TODO: Country/City in registration flow
                country: 'test-country',
                email,
                name,
                password,
              }),
            );
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
          <FormControl {...containerStyles}>
            <FormLabel htmlFor='email'>Email address</FormLabel>
            <Input
              isRequired
              id='email'
              // @ts-ignore
              onChange={({ target }): void => {
                setEmail(target.value);
              }}
              type='email'
              value={email}
            />
          </FormControl>
          <PasswordInput
            containerStyles={containerStyles}
            isPasswordVisible={isPasswordVisible}
            password={password}
            setIsPasswordVisible={setIsPasswordVisible}
            setPassword={setPassword}
          />
          <Button isLoading={loading === 'pending'} marginTop={6} type='submit' variantColor='green'>
            Register
          </Button>
        </form>
        {error && (
          <Alert marginTop={6} status='error' variant='left-accent'>
            <AlertIcon />
            {error}
          </Alert>
        )}
      </Box>
      <Box marginTop={12}>
        Already have an account?{' '}
        <RouterLink to={'/account/login' as AppRoutes}>
          <Link as='span' color='green.500' fontWeight='semibold'>
            Login here.
          </Link>
        </RouterLink>
      </Box>
    </Box>
  );
};

export const Registration = withRouter(PureRegistration);
