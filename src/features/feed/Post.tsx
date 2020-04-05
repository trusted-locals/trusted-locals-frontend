import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Image, Text, Link } from '@chakra-ui/core';

import { Author } from '../../components/Author';
import { Rating } from '../../components/Rating';
import { TimeAgo } from '../../components/TimeAgo';

import { Post as PostType } from './feedSlice';

type Props = {} & PostType;

const paddingProps = { padding: 2 };

const BORDER_RADIUS = 8;

export const Post: FC<Props> = ({ date, imageURL, postID, rating, title, userImageURL, username }: Props) => {
  const linkToDetailView = `/feed/detail/${postID}`;

  return (
    <>
      <Box
        boxShadow='0px 8px 12px rgba(42, 52, 61, 0.16078431372549)'
        borderRadius={BORDER_RADIUS}
        maxWidth={['initial', 'initial', 350]}
      >
        <Box height={128} position='relative'>
          <Link
            {...paddingProps}
            // @ts-ignore
            as={RouterLink}
            background='#ffffffdd'
            borderTopRightRadius={BORDER_RADIUS}
            bottom={0}
            position='absolute'
            // @ts-ignore
            to={linkToDetailView}
            width='80%'
          >
            {title}
          </Link>

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
              <TimeAgo date={new Date(date)} />
            </Text>
          </Box>
          <Box marginTop={2}>
            <Author userImageURL={userImageURL} username={username} />
          </Box>
        </Box>

        <Box {...paddingProps} alignItems='center' display='flex'>
          <Rating rating={rating} shouldShowDescription={false} />
          <Button
            as={RouterLink}
            marginLeft={6}
            // @ts-ignore
            to={linkToDetailView}
            variant='outline'
            variantColor='blue'
          >
            More
          </Button>
        </Box>
      </Box>
    </>
  );
};
