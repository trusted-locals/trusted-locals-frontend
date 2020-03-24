import React, { FC, useState } from 'react';
import { Alert, AlertIcon, Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/core';

import { PasswordInput } from '../components/PasswordInput';

import { fetch } from '../utils/fetch';

const MIN_LENGTH_USERNAME = 3;
const MAX_LENGTH_USERNAME = 16;

const containerStyles = {
  marginTop: 4,
};

export const RegistrationPage: FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
                // TODO: Country/City in registration flow
                country: 'test-country',
                email,
                name,
                password,
              }),
              method: 'POST',
            },
            onStart: () => {
              setIsLoading(true);
            },
            // eslint-disable-next-line
            onSuccess: (data: { success: boolean }) => {
              debugger;
            },
            onFailure: ({ errorMessage }) => {
              debugger;
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
