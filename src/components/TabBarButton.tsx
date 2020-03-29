import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, IconButton, IconButtonProps, Text } from '@chakra-ui/core';

type Props = {
  ariaLabel: IconButtonProps['aria-label'];
  icon: IconButtonProps['icon'];
  isActive: boolean;
  name: string;
  to: string;
};

export const TabBarButton: FC<Props> = ({ ariaLabel, icon, isActive, name, to }: Props) => (
  <Link to={to}>
    <Box alignItems='center' display='flex' flexDirection='column' paddingY={2}>
      <IconButton
        aria-label={ariaLabel}
        icon={icon}
        size='sm'
        variant={isActive ? 'solid' : 'outline'}
        variantColor='teal'
      />
      <Text fontSize='sm'>{name}</Text>
    </Box>
  </Link>
);
