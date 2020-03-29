import React, { FC } from 'react';
import { Box } from '@chakra-ui/core';

type Props = {
  type: string;
};

export const Feed: FC<Props> = ({ type }: Props) => <Box paddingX={4}>{type} feed</Box>;
