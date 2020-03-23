import React, { FC, useState } from 'react';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/core';

import { fetch } from '../utils/fetch';

const MIN_LENGTH_USERNAME = 3;
const MAX_LENGTH_USERNAME = 16;

const MIN_LENGTH_PASSWORD = 8;
const MAX_LENGTH_PASSWORD = 64;

const containerProps = {
  marginTop: 4,
};

export const RegistrationPage: FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [shouldShowPassword, setShouldShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <Box maxWidth='500px'>
      <form
        onSubmit={(e): void => {
          e.preventDefault();

          fetch('/user', {
            fetchOptions: {
              body: JSON.stringify({
                email,
                password,
                username,
              }),
              method: 'POST',
            },
            onStart: () => {
              setIsLoading(true);
            },
            // eslint-disable-next-line
            onSuccess: (data: object) => {},
            onFailure: ({ errorMessage }) => {
              setErrorMessage(errorMessage);
            },
            onEnd: () => {
              setIsLoading(false);
            },
          });
        }}
      >
        <FormControl {...containerProps}>
          <FormLabel htmlFor='username'>Username</FormLabel>
          <Input
            id='username'
            isRequired
            maxLength={MAX_LENGTH_USERNAME}
            minLength={MIN_LENGTH_USERNAME}
            // @ts-ignore
            onChange={({ target }): void => {
              setUsername(target.value);
            }}
            type='text'
            value={username}
          />
        </FormControl>
        <FormControl {...containerProps}>
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
        <FormControl {...containerProps}>
          <FormLabel htmlFor='password'>Password</FormLabel>
          <InputGroup size='md'>
            <Input
              id='password'
              maxLength={MAX_LENGTH_PASSWORD}
              minLength={MIN_LENGTH_PASSWORD}
              // @ts-ignore
              onChange={({ target }): void => {
                setPassword(target.value);
              }}
              value={password}
              type={shouldShowPassword ? 'text' : 'password'}
            />
            <InputRightElement width='4.5rem'>
              <Button
                aria-label='toggle password visibility'
                height='75%'
                size='sm'
                onClick={(): void => {
                  setShouldShowPassword(!shouldShowPassword);
                }}
              >
                {shouldShowPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button isLoading={isLoading} marginTop={6} variantColor='teal' type='submit'>
          Register
        </Button>
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
