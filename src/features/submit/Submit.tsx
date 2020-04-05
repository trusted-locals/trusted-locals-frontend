import React, { FC, FormEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/core';

import { selectAsync, submitted } from './submitSlice';
import { selectOwnProfile } from '../user/userSlice';

import { responsiveBoxProps } from '../../app/styles';

// TODO: Talk with BE.
const TITLE_MIN_LENGTH = 4;
const TITLE_MAX_LENGTH = 32;

// TODO: Talk with BE.
const TEXT_MIN_LENGTH = 4;
const TEXT_MAX_LENGTH = 65536;

const TEXTAREA_PLACEHOLDER = 'Share something with your local community';

const ARIA_TITLE = 'post-title';
const ARIA_TEXT = 'post-text';
const ARIA_IMAGE = 'post-image';
const ARIA_IMAGE_HELPER_TEXT = 'post-image-helper-text';

export const Submit: FC<{}> = () => {
  const dispatch = useDispatch();

  const toast = useToast();

  const { error, loading } = useSelector(selectAsync);
  const ownProfile = useSelector(selectOwnProfile);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const imageInput = useRef(null);

  // TODO: Display location

  return (
    <Box {...responsiveBoxProps}>
      <Heading as='h2' size='lg'>
        Submit a post
      </Heading>

      {ownProfile && (
        <Text color='gray.600' marginTop={8}>
          This post will only appear in the feed of {ownProfile.cityName}.
        </Text>
      )}

      <form
        onSubmit={(e): void => {
          e.preventDefault();

          dispatch(
            submitted({
              // TODO: Handle image content
              image: 'todo...',
              text,
              title,
            }),
          );

          toast({
            title: "Post couldn't be saved",
            description: 'This demo does not save submitted posts yet.',
            status: 'info',
            duration: 9000,
            isClosable: true,
          });
        }}
      >
        <FormControl marginTop={8}>
          <FormLabel htmlFor={ARIA_TITLE}>Title</FormLabel>
          <Input
            id={ARIA_TITLE}
            isRequired
            marginTop={2}
            maxLength={TITLE_MAX_LENGTH}
            minLength={TITLE_MIN_LENGTH}
            onChange={(e: FormEvent<HTMLInputElement>): void => {
              setTitle((e.target as HTMLInputElement).value);
            }}
            type='text'
            value={title}
          />
        </FormControl>
        <FormControl marginTop={8}>
          <FormLabel htmlFor={ARIA_TEXT}>Text</FormLabel>
          <Textarea
            id={ARIA_TEXT}
            isRequired
            marginTop={2}
            maxLength={TEXT_MAX_LENGTH}
            minLength={TEXT_MIN_LENGTH}
            onChange={(e: FormEvent<HTMLInputElement>): void => {
              setText((e.target as HTMLInputElement).value);
            }}
            placeholder={TEXTAREA_PLACEHOLDER}
            value={text}
          />
        </FormControl>
        <FormControl marginTop={8}>
          <FormLabel htmlFor={ARIA_IMAGE}>Image</FormLabel>
          <Input accept='image/png, image/jpeg' id={ARIA_IMAGE} marginTop={2} ref={imageInput} type='file' />
          <FormHelperText id={ARIA_IMAGE_HELPER_TEXT}>Providing an image is optional.</FormHelperText>
        </FormControl>
        <Button isLoading={loading === 'pending'} marginTop={10} type='submit' variantColor='blue'>
          Submit
        </Button>
      </form>
      {error && (
        <Alert marginTop={6} status='error' variant='left-accent'>
          <AlertIcon />
          {error}
        </Alert>
      )}
    </Box>
  );
};
