import React, { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Box, BoxProps, Button, ButtonProps, Heading, HeadingProps } from '@chakra-ui/core';

import { responsiveBoxProps } from '../../app/styles';

import { AppRoutes } from '../../app/router';

type RouterButtonProps = {
  children: ReactNode;
  to: AppRoutes;
} & ButtonProps;

const RouterButton: FC<RouterButtonProps> = ({ children, ...otherProps }: RouterButtonProps) => (
  <Button {...buttonProps} {...otherProps}>
    {children}
  </Button>
);

const headingProps: HeadingProps = {
  as: 'h3',
  fontSize: 'lg',
  size: 'lg',
};

const buttonContainerProps: BoxProps = {
  marginTop: 12,
};

const buttonProps: Partial<ButtonProps> = {
  as: Link,
  marginTop: 4,
  variantColor: 'green',
};

export const Account: FC<{}> = () => (
  <Box {...responsiveBoxProps}>
    <Heading as='h2'>Account</Heading>
    <Box {...buttonContainerProps}>
      <Heading {...headingProps}>Already have an account?</Heading>
      <RouterButton to='/account/login'>Sign in</RouterButton>
    </Box>
    <Box {...buttonContainerProps}>
      <Heading {...headingProps}>Create an account:</Heading>
      <RouterButton to='/account/register' variant='outline'>
        Register
      </RouterButton>
    </Box>
  </Box>
);
