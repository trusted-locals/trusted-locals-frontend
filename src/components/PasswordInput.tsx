import React, { FC } from 'react';
import { BoxProps, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/core';

const MIN_LENGTH_PASSWORD = 8;
const MAX_LENGTH_PASSWORD = 64;

type Props = {
  containerStyles: BoxProps;
  isPasswordVisible: boolean;
  password: string;
  setIsPasswordVisible: (isPasswordVisible: Props['isPasswordVisible']) => void;
  setPassword: (password: Props['password']) => void;
};

export const PasswordInput: FC<Props> = ({
  containerStyles,
  isPasswordVisible,
  password,
  setIsPasswordVisible,
  setPassword,
}) => (
  <FormControl {...containerStyles}>
    <FormLabel htmlFor='password'>Password</FormLabel>
    <InputGroup size='md'>
      <Input
        id='password'
        isRequired
        maxLength={MAX_LENGTH_PASSWORD}
        minLength={MIN_LENGTH_PASSWORD}
        // @ts-ignore
        onChange={({ target }): void => {
          setPassword(target.value);
        }}
        value={password}
        type={isPasswordVisible ? 'text' : 'password'}
      />
      <InputRightElement width='4.5rem'>
        <Button
          aria-label='toggle password visibility'
          height='65%'
          onClick={(): void => {
            setIsPasswordVisible(!isPasswordVisible);
          }}
          variant='outline'
          size='sm'
        >
          {isPasswordVisible ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  </FormControl>
);
