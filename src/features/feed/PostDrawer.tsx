import React, { FC, RefObject } from 'react';
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
} from '@chakra-ui/core';
import { useWindowWidth } from '@react-hook/window-size';

import { Author } from '../../components/Author';
import { Rating } from '../../components/Rating';

import { Post as PostType } from './feedSlice';

import { convertWidthToEM } from '../../utils/dom-utils';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  post: PostType;
  postContainerRef: RefObject<any>;
};

const MOBILE_BREAKPOINT_EM = 48;

export const PostDrawer: FC<Props> = ({
  isOpen,
  onClose,
  post: { categories, date, imageURL, rating, text, title, userImageURL, username },
  postContainerRef,
}: Props) => {
  // Workaround for hidden header on mobile devices
  const widthPX = useWindowWidth(0, { leading: true, wait: 250 });
  const widthEM = convertWidthToEM(widthPX);
  const deviceSpecificProps = widthEM <= MOBILE_BREAKPOINT_EM ? { marginTop: 24 } : {};

  return (
    <Drawer
      scrollBehavior='inside'
      isFullHeight
      isOpen={isOpen}
      placement='bottom'
      onClose={onClose}
      finalFocusRef={postContainerRef}
    >
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
              <Tag key={category} size='sm'>
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
              {new Date(date).toDateString()}
            </Text>
            <Divider borderColor='gray.300' height='80%' orientation='vertical' />
            <Author
              style={{
                alignItems: 'center',
                display: 'flex',
                height: '100%',
              }}
              userImageURL={userImageURL}
              username={username}
            />
          </Box>
        </DrawerHeader>

        <DrawerBody margin='0 auto' maxWidth='1000px' width={['initial', 'initial', 1000]}>
          {imageURL && <Image alt='post image' maxHeight={150} src={imageURL} />}

          <Box marginTop={6}>
            <Text>{text}</Text>
          </Box>

          <Box display='flex' marginTop={6}>
            <Box flex={3} marginRight={4}>
              <Text as='h3' color='gray.600' fontWeight='semibold' marginBottom={1}>
                Confidence score:
              </Text>
              <Text>
                Based on information gathered, we do not have enough information to be confident of this data.
              </Text>
            </Box>
            <Box flex={1}>
              <Rating
                boxProps={{ height: '100%', width: '100%', maxWidth: 70, maxHeight: 70 }}
                labelProps={{ fontSize: '16px' }}
                rating={rating}
              />
            </Box>
          </Box>
        </DrawerBody>

        <DrawerFooter maxWidth='1000px' width={['initial', 'initial', 1000]} margin={['initial', 'initial', '0 auto']}>
          <Button
            onClick={(): void => {
              onClose();
            }}
            variant='ghost'
            variantColor='blue'
          >
            Unreliable
          </Button>
          <Button
            marginLeft={4}
            onClick={(): void => {
              onClose();
            }}
            variantColor='blue'
          >
            Reliable
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
