import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Image, PseudoBox, Link } from '@chakra-ui/core';

import { PostInfo } from './PostInfo';

import { Rating } from '../../components/Rating';

import { Post as PostType } from './feedSlice';

type Props = {
  detailViewRedirectToProfile?: boolean;
} & PostType;

const paddingProps = { padding: 2 };

const BORDER_RADIUS = 8;

export const Post: FC<Props> = ({
  date,
  detailViewRedirectToProfile,
  imageURL,
  postID,
  rating,
  title,
  userImageURL,
  username,
}: Props) => {
  const linkToDetailView = `/feed/detail/${postID}${detailViewRedirectToProfile ? `?redirect=profile` : ''}`;

  return (
    <>
      <Box
        boxShadow='0px 8px 12px rgba(42, 52, 61, 0.16078431372549)'
        borderRadius={BORDER_RADIUS}
        maxWidth={['initial', 'initial', 350]}
      >
        {/*
        // @ts-ignore */}
        <Link as={RouterLink} to={linkToDetailView}>
          <Box height={128} position='relative'>
            <PseudoBox
              {...paddingProps}
              background='#ffffffdd'
              // @ts-ignore
              borderTopRightRadius={BORDER_RADIUS}
              bottom={0}
              _hover={{
                textDecoration: 'underline',
              }}
              position='absolute'
              width='80%'
            >
              {title}
            </PseudoBox>

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
        </Link>

        <PostInfo date={date} userImageURL={userImageURL} username={username} style={paddingProps} />

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
