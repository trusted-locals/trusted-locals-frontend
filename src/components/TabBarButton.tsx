import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, IconButton, IconButtonProps, Text } from '@chakra-ui/core';

import { ThemeType } from '../app/styles';

type Props = {
  ariaLabel: IconButtonProps['aria-label'];
  icon: keyof ThemeType['icons'];
  isActive: boolean;
  name: string;
  to: string;
};

export const TabBarButton: FC<Props> = ({ ariaLabel, icon, isActive, name, to }: Props) => (
  <Link to={to}>
    <Box alignItems='center' display='flex' flexDirection='column' paddingY={2}>
      <IconButton
        aria-label={ariaLabel}
        as='span'
        // @ts-ignore
        icon={icon}
        isActive={isActive}
        size='md'
        variant='link'
        variantColor='gray'
      />
      <Text as='span' color={isActive ? 'black' : 'gray.600'} fontSize='sm'>
        {name}
      </Text>
    </Box>
  </Link>
);
