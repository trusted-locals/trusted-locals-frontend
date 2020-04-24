import React, { FC, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
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

import { Category } from '../feed/feedSlice';
import { CATEGORY_NAMES } from '../feed/DetailView';

// TODO: Talk with BE.
const TITLE_MIN_LENGTH = 4;
const TITLE_MAX_LENGTH = 32;

// TODO: Talk with BE.
const TEXT_MIN_LENGTH = 4;
const TEXT_MAX_LENGTH = 65536;

const TEXTAREA_PLACEHOLDER = 'Share something with your local community';

const ARIA_TITLE = 'post-title';
const ARIA_TEXT = 'post-text';
const ARIA_CATEGORIES = 'post-categories';
const ARIA_IMAGE = 'post-image';
const ARIA_IMAGE_HELPER_TEXT = 'post-image-helper-text';

export const Submit: FC<{}> = () => {
  const dispatch = useDispatch();

  const toast = useToast();

  const { error, loading } = useSelector(selectAsync);
  const ownProfile = useSelector(selectOwnProfile).profile ?? null;

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageURL, setImageURL] = useState('');

  const username = ownProfile?.username ?? null;
  const userImageURL = ownProfile?.imageURL ?? null;

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

          if (categories.length === 0) {
            toast({
              title: 'No category selected',
              description: 'Please select at least one category.',
              status: 'error',
              duration: 7000,
              isClosable: true,
            });

            return;
          }

          dispatch(
            submitted({
              categories,
              comments: [],
              image: imageURL === '' ? null : imageURL,
              text,
              title,
              userImageURL,
              username,
            }),
          );

          toast({
            title: 'Post submitted.',
            status: 'success',
            duration: 4000,
            isClosable: true,
          });
          // TODO: Redirect
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
          <FormLabel htmlFor={ARIA_CATEGORIES}>Categories</FormLabel>
          <CheckboxGroup
            // @ts-ignore
            onChange={(nextCategories: Category[]): void => {
              setCategories(nextCategories);
            }}
            value={categories}
          >
            {Object.entries(CATEGORY_NAMES).map(([category, categoryName]) => (
              <Checkbox key={category} value={category}>
                {categoryName}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </FormControl>
        <FormControl marginTop={8}>
          <FormLabel htmlFor={ARIA_IMAGE}>Image</FormLabel>
          <Input
            id={ARIA_IMAGE}
            marginTop={2}
            onChange={(e: FormEvent<HTMLInputElement>): void => {
              setImageURL((e.target as HTMLInputElement).value);
            }}
            placeholder='Attach a URL of an image here'
            type='text'
            value={imageURL}
          />
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
