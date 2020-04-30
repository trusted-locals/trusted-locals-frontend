import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/core';

import { responsiveBoxProps } from '../app/styles';

export const PageError = () => (
  <Box {...responsiveBoxProps}>
    <Heading as='h3' fontSize='lg'>
      Site could not be loaded
    </Heading>
    <Text color='gray.700' marginTop={2}>
      Please check your network connection and try again.
    </Text>
  </Box>
);
