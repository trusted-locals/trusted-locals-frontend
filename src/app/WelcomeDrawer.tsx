import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
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

const DID_SEE_WELCOME_DRAWER_KEY = 'did-see-welcome-drawer-02';

export const WelcomeDrawer: FC<{}> = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { search } = useLocation();
  const shouldHide = search === '?hide-welcome-drawer=true';

  const onClose = (): void => {
    localStorage.setItem(DID_SEE_WELCOME_DRAWER_KEY, 'true');
    setIsVisible(false);
  };

  useEffect((): void => {
    if (!shouldHide) {
      const value = localStorage.getItem(DID_SEE_WELCOME_DRAWER_KEY);
      setIsVisible(value !== 'true');
    }
  }, [shouldHide]);

  return (
    <Drawer isOpen={isVisible} isFullHeight placement='top' onClose={onClose}>
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
            We believe people are best served through their local communities. By crowdsourcing information related to
            your community in an organized and audited way that are visible to everyone, it can build up trust and
            empower people to take actions with confidence.
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
};
