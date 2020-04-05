import React, { FC } from 'react';
import { Box, BoxProps, CircularProgress, CircularProgressLabel, Text } from '@chakra-ui/core';

import { Post } from '../features/feed/feedSlice';

const NOT_CONFIDENT = 'Based on information gathered, we do not have enough information to be confident of this data.';
const CONFIDENT = 'Based on information gathered, we are confident of this data.';

const colorForRating = (rating: Post['rating']): string => {
  if (rating === null || rating < 40) {
    return 'gray';
  }

  if (rating >= 40 && rating <= 70) {
    return 'yellow';
  }

  return 'green';
};

const descriptionForRating = (rating: Post['rating']): string => {
  if (rating === null || rating < 40) {
    return CONFIDENT;
  }

  if (rating >= 40 && rating <= 70) {
    return NOT_CONFIDENT;
  }

  return CONFIDENT;
};

type Props = { boxProps?: BoxProps; labelProps?: BoxProps; rating: Post['rating']; shouldShowDescription: boolean };

export const Rating: FC<Props> = ({ boxProps, labelProps, rating, shouldShowDescription }: Props) => {
  const color = colorForRating(rating);

  const circularRating = (
    <CircularProgress
      aria-label='reliability score of post'
      color={color}
      role='presentation'
      style={boxProps}
      trackColor={color}
      value={rating ?? 100}
    >
      <CircularProgressLabel style={labelProps}>{rating ?? '?'}</CircularProgressLabel>
    </CircularProgress>
  );

  if (!shouldShowDescription) {
    return circularRating;
  }

  return (
    <Box display='flex' flex={1}>
      <Box flex={3} marginRight={4}>
        <Text as='h3' color='gray.700' fontWeight='semibold' marginBottom={1}>
          Confidence score:
        </Text>
        <Text>{descriptionForRating(rating)}</Text>
      </Box>
      <Box flex={1}>{circularRating}</Box>
    </Box>
  );
};
