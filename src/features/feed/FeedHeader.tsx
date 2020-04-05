import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from '@chakra-ui/core';

import { selectOwnProfile } from '../user/userSlice';

import { responsiveBoxProps } from '../../app/styles';

import { AppRoutes } from '../../app/router';

type Props = {};

const INPUT_PLACEHOLDER = 'Use keywords to search for information';

const Location: FC<{}> = () => {
  const profile = useSelector(selectOwnProfile).profile ?? null;

  if (profile === null) {
    return null;
  }

  return (
    <Text as='a' fontWeight='semibold' textDecoration='underline'>
      {profile.cityName}
    </Text>
  );
};

export const FeedHeader: FC<Props> = (_props: Props) => {
  const profile = useSelector(selectOwnProfile).profile ?? null;

  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const onModalClose = (): void => {
    setModalIsOpen(false);
  };

  const toast = useToast();

  if (!profile) {
    return (
      <Box {...responsiveBoxProps}>
        <p>Sign in to vote and contribute.</p>
        <RouterLink to={'/account/login' as AppRoutes}>
          <Button marginTop={4} size='sm' variantColor='blue'>
            Sign in
          </Button>
        </RouterLink>
      </Box>
    );
  }

  return (
    <Box {...responsiveBoxProps}>
      <Text color='gray.600' fontSize='lg'>
        Good morning, {profile.firstName || profile.cityName}
      </Text>
      <Text
        color='gray.600'
        cursor='pointer'
        fontSize='lg'
        marginTop={1}
        onClick={(): void => {
          setModalIsOpen(true);
        }}
      >
        Here are the latest for <Location />
      </Text>
      <InputGroup marginTop={4}>
        <InputLeftElement>
          <Icon color='gray.400' name='search' />
        </InputLeftElement>
        <Input
          fontSize={['xs', 'sm', 'md']}
          maxWidth={400}
          onFocus={(): void => {
            toast({
              title: 'Not yet implemented',
              description: 'This demo does not support searching posts yet.',
              status: 'info',
              duration: 7000,
              isClosable: true,
            });
          }}
          placeholder={INPUT_PLACEHOLDER}
          type='text'
        />
      </InputGroup>

      <Modal isOpen={modalIsOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Changing the feed&apos;s location</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight='semibold'>Not yet implemented</Text>
            <Text marginTop={4}>
              Here you will be able to change the feed&apos;s location and see posts from all over the world. However,
              creating posts and validating other posts is restricted to your location.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={(): void => {
                setModalIsOpen(false);
              }}
              variantColor='blue'
            >
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
