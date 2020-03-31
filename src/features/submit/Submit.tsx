import React, { FC, FormEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
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
  Textarea,
} from '@chakra-ui/core';

import { selectAsync, submitted } from './submitSlice';

import { responsiveBoxProps } from '../../app/styles';

import { AppRoutes } from '../../app/router';

// TODO: Talk with BE.
const TEXTAREA_MIN_LENGTH = 4;
const TEXTAREA_MAX_LENGTH = 65536;

const TEXTAREA_PLACEHOLDER = 'Share something with your local community';

const ARIA_IMAGE = 'post-image';
const ARIA_IMAGE_HELPER_TEXT = 'post-image-helper-text';
const ARIA_TEXTAREA = 'post-text';

type Props = {} & RouteComponentProps;

const PureSubmit: FC<Props> = ({ history }: Props) => {
  const dispatch = useDispatch();

  const { error, loading } = useSelector(selectAsync);

  const [text, setText] = useState('');
  const imageInput = useRef(null);

  return (
    <Box {...responsiveBoxProps}>
      <Heading as='h2'>Submit</Heading>
      <form
        onSubmit={(e): void => {
          e.preventDefault();

          dispatch(
            submitted({
              body: {
                // TODO: Handle image content
                image: 'todo...',
                text,
              },
              onSuccess: () => {
                history.push('/feed' as AppRoutes);
              },
            }),
          );
        }}
      >
        <FormControl marginTop={8}>
          <FormLabel htmlFor={ARIA_TEXTAREA}>Text</FormLabel>
          <Textarea
            id={ARIA_TEXTAREA}
            isRequired
            marginTop={2}
            maxLength={TEXTAREA_MAX_LENGTH}
            minLength={TEXTAREA_MIN_LENGTH}
            onChange={(e: FormEvent<HTMLInputElement>): void => {
              setText((e.target as HTMLInputElement).value);
            }}
            placeholder={TEXTAREA_PLACEHOLDER}
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

export const Submit = withRouter(PureSubmit);
