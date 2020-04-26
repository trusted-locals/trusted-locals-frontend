import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, RouteComponentProps, useHistory } from 'react-router-dom';
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
  Input,
  Link as ChakraLink,
  Tag,
  Text,
  useToast,
} from '@chakra-ui/core';

import { Comment } from './Comment';
import { PostInfo } from './PostInfo';

import { Rating } from '../../components/Rating';

import { Category, postRequested, selectPostByID } from './feedSlice';
import { selectOwnProfile } from '../user/userSlice';

import { RootState } from '../../app/store';

import { FALLBACK_IMAGE_URL } from './Post';

type Props = {
  previousPathname?: string;
} & RouteComponentProps<{ postID: string }>;

export const CATEGORY_NAMES: { [key in Category]: string } = {
  news: 'News',
  medical_supply: 'Medical Supply',
  grocery: 'Grocery',
  advice: 'Advice',
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

export const DetailView: FC<Props> = ({ match, previousPathname }: Props) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const toast = useToast();
  const ownProfile = useSelector(selectOwnProfile).profile ?? null;

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

  const { categories, comments, date, imageURL, rating, text, title, userImageURL, username } = post.post;

  const onClose = (): void => {
    const nextPath = previousPathname ?? '/';
    history.push(nextPath);
  };

  const onComment = (): void => {
    toast({
      title: 'Comment not submitted',
      description: 'Submitting commments is not yet supported in this demo.',
      status: 'info',
      duration: 7000,
      isClosable: true,
    });
  };

  const footerContent = (
    <>
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
    </>
  );

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
    <>
      <Drawer onClose={onClose} isFullHeight scrollBehavior='inside' placement='top' isOpen>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton aria-label='return to feed' />
          <DrawerHeader margin={['inherit', 'inherit', '0 auto']} width={['initial', 'initial', 1000]}>
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
            <Image alt='post image' maxHeight={150} src={imageURL ?? FALLBACK_IMAGE_URL} />
            <Box marginTop={8}>
              <Text>{text}</Text>
            </Box>
            <Box display='flex' marginTop={[8, 8, 10]}>
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
            <Box marginTop={[8, 8, 10]}>
              <Text as='h3' color='gray.700' fontWeight='semibold' marginBottom={1}>
                Comments
              </Text>
              <div
                // eslint-disable-next-line
                onClick={(event): void => {
                  // Prevent Drawer#onClose from being called so history#push isn't called.
                  event.stopPropagation();
                }}
                role='presentation'
              >
                <Box marginTop={4}>
                  {comments.length > 0 ? (
                    comments
                      .slice()
                      .sort((commentA, commentB) => (commentA.date > commentB.date ? -1 : 1))
                      .map((comment) => <Comment key={comment.commentID} {...comment} />)
                  ) : (
                    <Text fontSize='sm'>No comments</Text>
                  )}
                </Box>
                <Box display='flex' marginTop={4}>
                  <Box marginRight={4} width={['80%', '80%', '40%']}>
                    <Input
                      aria-label='comment on this post'
                      variant='flushed'
                      rounded={4}
                      placeholder='Share with your neighbors'
                      size='sm'
                    />
                  </Box>
                  <Button
                    onClick={(): void => {
                      onComment();
                    }}
                    size='sm'
                    variant='ghost'
                  >
                    Comment
                  </Button>
                </Box>
              </div>
            </Box>
            {isIOS && (
              <Box display='flex' justifyContent='flex-end' marginTop={8} marginBottom={16}>
                {footerContent}
              </Box>
            )}
          </DrawerBody>

          <DrawerFooter
            maxWidth='1000px'
            width={['initial', 'initial', 1000]}
            margin={['initial', 'initial', '0 auto']}
          >
            {!isIOS && footerContent}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
