import React, { FC } from 'react';
import { BoxProps, CircularProgress, CircularProgressLabel } from '@chakra-ui/core';

import { Post } from '../features/feed/feedSlice';

const colorForRating = (rating: Post['rating']): string => {
  if (rating === null || rating < 30) {
    return 'gray';
  }

  if (rating >= 30 && rating <= 70) {
    return 'yellow';
  }

  return 'green';
};

type Props = { boxProps?: BoxProps; labelProps?: BoxProps; rating: Post['rating'] };

export const Rating: FC<Props> = ({ boxProps, labelProps, rating }: Props) => {
  const color = colorForRating(rating);

  return (
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
};
