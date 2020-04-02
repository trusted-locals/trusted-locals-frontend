import React, { FC, useState } from 'react';
import { Box, BoxProps, Image, ImageProps } from '@chakra-ui/core';

type Props = {
  skeletonProps: BoxProps;
} & ImageProps;

export const ImageWithSkeleton: FC<Props> = ({ skeletonProps, ...imageProps }: Props) => {
  const [didLoad, setDidLoad] = useState(false);

  return (
    <>
      {!didLoad && <Box {...skeletonProps} background='#edf2f7' />}
      <Image
        display={didLoad ? 'block' : 'none'}
        onLoad={(): void => {
          setDidLoad(true);
        }}
        {...imageProps}
      />
    </>
  );
};
