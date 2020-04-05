import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import { useWindowWidth } from '@react-hook/window-size';
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Image,
  Tag,
  Text,
  useToast,
} from '@chakra-ui/core';

import { Author } from '../../components/Author';
import { Rating } from '../../components/Rating';
import { TimeAgo } from '../../components/TimeAgo';

import { postRequested, selectPostByID } from './feedSlice';
import { selectOwnProfile } from '../user/userSlice';

import { convertWidthToEM } from '../../utils/dom-utils';

import { RootState } from '../../app/store';

const HANDHELD_BREAKPOINT = 48;
const MOBILE_BREAKPOINT_EM = 30;

type Props = {
  previousPathname?: string;
} & RouteComponentProps<{ postID: string }>;

export const DetailView: FC<Props> = ({ match, previousPathname }: Props) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const toast = useToast();

  const ownProfile = useSelector(selectOwnProfile);

  // Workaround for hidden header on mobile devices
  const widthPX = useWindowWidth(0, {
    leading: true,
    wait: 250,
  });
  const widthEM = convertWidthToEM(widthPX);
  // TODO: iOS only
  const deviceSpecificProps = widthEM <= HANDHELD_BREAKPOINT ? { marginTop: 24 } : {};
  const isFullHeight = widthEM <= MOBILE_BREAKPOINT_EM;

  const postID: string | null = match.params.postID ?? null;

  const post = useSelector((state: RootState) => selectPostByID(state, parseInt(postID)));

  useEffect(() => {
    if (post === null) {
      dispatch(postRequested(+postID));
    }
  }, [dispatch, post, postID]);

  if (post?.async.error) {
    return <>TODO: Error state</>;
  }

  if (post === null || !post.post) {
    return <>TODO: Null state</>;
  }

  const { categories, date, imageURL, rating, text, title, userImageURL, username } = post.post;

  const onClose = (): void => {
    const nextPath = previousPathname ?? '/';
    history.push(nextPath);
  };

  const onVote = (): void => {
    toast({
      title: 'Vote saved.',
      description: `Thank you for making ${
        ownProfile?.cityName ? `content in ${ownProfile.cityName}` : 'local content'
      } more reliable.`,
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <Drawer scrollBehavior='inside' isFullHeight={isFullHeight} isOpen onClose={onClose} placement='bottom'>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton {...deviceSpecificProps} aria-label='return to feed' />
        <DrawerHeader
          margin={['inherit', 'inherit', '0 auto']}
          width={['initial', 'initial', 1000]}
          {...deviceSpecificProps}
        >
          <Text as='h2'>{title}</Text>

          <Box marginTop={2}>
            {categories.map((category) => (
              <Tag key={category} marginRight={2} size='sm'>
                {category}
              </Tag>
            ))}
          </Box>

          <Box alignItems='center' display='flex' height='30px' marginTop={4}>
            <Text
              alignItems='center'
              as='span'
              color='gray.500'
              display='flex'
              fontSize='sm'
              fontWeight='normal'
              height='100%'
            >
              <TimeAgo date={new Date(date)} />
            </Text>
            <Divider borderColor='gray.300' height='80%' orientation='vertical' />
            <div
              // eslint-disable-next-line
              onClick={(event): void => {
                // Prevent Drawer#onClose from being called so history#push isn't called.
                event.stopPropagation();
              }}
              role='presentation'
            >
              <Author
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  height: '100%',
                }}
                userImageURL={userImageURL}
                username={username}
              />
            </div>
          </Box>
        </DrawerHeader>

        <DrawerBody margin='0 auto' maxWidth='1000px' width={['initial', 'initial', 1000]}>
          {imageURL && <Image alt='post image' maxHeight={150} src={imageURL} />}

          <Box marginTop={6}>
            <Text>{text}</Text>
          </Box>

          <Box display='flex' marginTop={16}>
            <Rating
              boxProps={{
                height: '100%',
                width: '100%',
                maxWidth: 70,
                maxHeight: 70,
              }}
              labelProps={{
                fontSize: '16px',
              }}
              rating={rating}
              shouldShowDescription
            />
          </Box>
        </DrawerBody>

        <DrawerFooter maxWidth='1000px' width={['initial', 'initial', 1000]} margin={['initial', 'initial', '0 auto']}>
          <Button
            onClick={(): void => {
              onVote();
              onClose();
            }}
            variant='ghost'
            variantColor='blue'
          >
            Disconfirm
          </Button>
          <Button
            marginLeft={4}
            onClick={(): void => {
              onVote();
              onClose();
            }}
            variantColor='blue'
          >
            Confirm
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
