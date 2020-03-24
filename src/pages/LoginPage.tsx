import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, AlertIcon, Box, Button, FormControl, FormLabel, Input, Link } from '@chakra-ui/core';

import { PasswordInput } from '../components/PasswordInput';

import { fetch } from '../utils/fetch';

const MIN_LENGTH_USERNAME = 3;
const MAX_LENGTH_USERNAME = 16;

const containerStyles = {
  marginTop: 4,
};

export const LoginPage: FC = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <Box maxWidth='500px'>
      <form
        onSubmit={(e): void => {
          e.preventDefault();

          fetch('/user/login', {
            fetchOptions: {
              body: JSON.stringify({
                name,
                password,
              }),
              method: 'POST',
            },
            onStart: () => {
              setIsLoading(true);
            },
            onSuccess: (_data: { success: boolean; token: string }) => {
              history.push('/');
            },
            onFailure: ({ errorMessage }) => {
              setErrorMessage(errorMessage);
            },
            onEnd: () => {
              setIsLoading(false);
            },
          });
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
          <Button isLoading={isLoading} variantColor='teal' type='submit'>
            Login
          </Button>
          {/* TODO: Link */}
          <Link display='flex' href='/'>
            <Button variant='link' size='sm'>
              Forgot password?
            </Button>
          </Link>
        </Box>
      </form>
      {errorMessage && (
        <Alert marginTop={6} status='error' variant='left-accent'>
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}
    </Box>
  );
};
