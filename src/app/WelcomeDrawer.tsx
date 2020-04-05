import React, { FC } from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
} from '@chakra-ui/core';

type Props = {
  onClose: () => void;
  visible: boolean;
};

export const WelcomeDrawer: FC<Props> = ({ onClose, visible }: Props) => (
  <Drawer isOpen={visible} isFullHeight placement='top' onClose={onClose}>
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader margin={['inherit', 'inherit', '0 auto']} maxWidth={500}>
        Welcome to Trusted Locals!
      </DrawerHeader>

      <DrawerBody margin='0 auto' maxWidth={500}>
        <Button onClick={onClose} padding={0} variant='ghost' variantColor='blue'>
          Show the demo
        </Button>
        <Text marginTop={8} fontSize={16} fontWeight='semibold'>
          About
        </Text>
        <Text>
          Trusted Locals is a platform built for finding reliable on-site information in times of crisis. With Trusted
          Locals you can avoid the chaos of social media content that is duplicate, irrelevant, and uncategorized.
        </Text>
        <Text marginTop={8} fontSize={16} fontWeight='semibold'>
          Disclaimer
        </Text>
        <Text>
          In this demo, you will be logged in with the profile of one of our developers. None of your votes or created
          posts will be saved. The posts you see are made up, and should not be taken seriously.
        </Text>
      </DrawerBody>

      <DrawerFooter margin={['inherit', 'inherit', '0 auto']} maxWidth={500}>
        <Button onClick={onClose} variantColor='blue'>
          Show the demo
        </Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);
