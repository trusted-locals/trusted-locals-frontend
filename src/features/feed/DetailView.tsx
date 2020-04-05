import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, RouteComponentProps, useHistory } from 'react-router-dom';
import { useWindowWidth } from '@react-hook/window-size';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Image,
  Link as ChakraLink,
  Tag,
  Text,
  useToast,
} from '@chakra-ui/core';

import { PostInfo } from './PostInfo';

import { Rating } from '../../components/Rating';

import { Category, postRequested, selectPostByID } from './feedSlice';
import { selectOwnProfile } from '../user/userSlice';

import { convertWidthToEM } from '../../utils/dom-utils';

import { RootState } from '../../app/store';

const MOBILE_BREAKPOINT_EM = 30;

type Props = {
  previousPathname?: string;
} & RouteComponentProps<{ postID: string }>;

const CATEGORY_NAMES: { [key in Category]: string } = {
  advice: 'Advice',
  grocery: 'Grocery',
  medical_supply: 'Medical Supply',
  news: 'News',
};

const CATEGORY_LINKS: { [key in Category]: string } = {
  advice: '/feed/advice',
  grocery: '/feed/grocery',
  medical_supply: '/feed/medical-supply',
  news: '/feed/news',
};

const Link: any = ChakraLink;

// https://stackoverflow.com/questions/9038625/detect-if-device-is-ios/58065241#58065241
const isIOS =
  (/iPad|iPhone|iPod/.test(navigator.platform) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) &&
  !window.MSStream;
const deviceSpecificProps = isIOS ? { marginTop: 24 } : {};

export const DetailView: FC<Props> = ({ match, previousPathname }: Props) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const toast = useToast();

  const ownProfile = useSelector(selectOwnProfile).profile ?? null;

  // Workaround for hidden header on mobile devices
  const widthPX = useWindowWidth(0, {
    leading: true,
    wait: 250,
  });
  const widthEM = convertWidthToEM(widthPX);
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
      duration: 7000,
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

          <Box
            marginTop={2}
            onClick={(event): void => {
              // Prevent Drawer#onClose from being called so history#push isn't called.
              event.stopPropagation();
            }}
          >
            {categories.map((category: Category) => (
              <Link as={RouterLink} key={category} to={CATEGORY_LINKS[category]}>
                <Tag marginRight={2} size='sm'>
                  {CATEGORY_NAMES[category]}
                </Tag>
              </Link>
            ))}
          </Box>

          <div
            // eslint-disable-next-line
            onClick={(event): void => {
              // Prevent Drawer#onClose from being called so history#push isn't called.
              event.stopPropagation();
            }}
            role='presentation'
          >
            <PostInfo date={date} style={{ marginTop: 4 }} userImageURL={userImageURL} username={username} />
          </div>
        </DrawerHeader>

        <DrawerBody margin='0 auto' maxWidth='1000px' width={['initial', 'initial', 1000]}>
          {imageURL && <Image alt='post image' maxHeight={150} src={imageURL} />}

          <Box marginTop={6}>
            <Text>{text}</Text>
          </Box>

          <Box display='flex' marginTop={[4, 8, 12]}>
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
