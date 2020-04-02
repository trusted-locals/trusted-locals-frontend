import React, { FC } from 'react';
import { Box, Button, Image, Text, useDisclosure } from '@chakra-ui/core';

import { PostDrawer } from './PostDrawer';
import { Author } from '../../components/Author';
import { Rating } from '../../components/Rating';

import { Post as PostType } from './feedSlice';

type Props = {} & PostType;

const paddingProps = { padding: 2 };

const BORDER_RADIUS = 8;

export const Post: FC<Props> = (props: Props) => {
  const { isOpen: drawerIsOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  const moreButtonRef = React.useRef();
  const postContainerRef = React.useRef();

  const { date, imageURL, rating, title, userImageURL, username } = props;

  return (
    <>
      <Box
        boxShadow='0px 8px 12px rgba(42, 52, 61, 0.16078431372549)'
        borderRadius={BORDER_RADIUS}
        maxWidth={300}
        ref={postContainerRef}
      >
        <Box height={128} position='relative'>
          <Text
            {...paddingProps}
            background='#ffffffaa'
            // @ts-ignore
            borderTopRightRadius={BORDER_RADIUS}
            bottom={0}
            position='absolute'
            width='80%'
          >
            {title}
          </Text>

          {imageURL && (
            <Image
              alt='post background image'
              // @ts-ignore
              borderTopLeftRadius={BORDER_RADIUS}
              // @ts-ignore
              borderTopRightRadius={BORDER_RADIUS}
              height='100%'
              objectFit='cover'
              src={imageURL}
              width='100%'
            />
          )}
        </Box>

        <Box {...paddingProps}>
          <Box>
            <Text color='gray.500' fontSize='sm'>
              {new Date(date).toDateString()}
            </Text>
          </Box>
          <Box marginTop={2}>
            <Author userImageURL={userImageURL} username={username} />
          </Box>
        </Box>

        <Box {...paddingProps} alignItems='center' display='flex'>
          <Rating rating={rating} />
          <Button onClick={onDrawerOpen} ref={moreButtonRef} marginLeft={6} variant='outline' variantColor='blue'>
            More
          </Button>
        </Box>
      </Box>

      <PostDrawer isOpen={drawerIsOpen} onClose={onDrawerClose} post={props} postContainerRef={postContainerRef} />
    </>
  );
};
