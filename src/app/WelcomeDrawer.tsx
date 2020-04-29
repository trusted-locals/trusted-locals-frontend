import React, { FC, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Heading,
  Image,
  Text,
} from '@chakra-ui/core';

const DID_SEE_WELCOME_DRAWER_KEY = 'did-see-welcome-drawer-02';
const LOGO_PATH = process.env.PUBLIC_URL + '/logos/logo-transparent.png';

export const WelcomeDrawer: FC<{}> = () => {
  const showDemoButtonRef = useRef();
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
    <Drawer
      isOpen={isVisible}
      // @ts-ignore
      initialFocusRef={showDemoButtonRef}
      isFullHeight
      onClose={onClose}
      placement='top'
      scrollBehavior='inside'
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader margin={['inherit', 'inherit', '0 auto']} maxWidth={500}>
          <Image alt='logo of trusted locals' src={LOGO_PATH} />
        </DrawerHeader>

        <DrawerBody margin='0 auto' maxWidth={500}>
          <Heading as='h3' marginTop={4} size='sm'>
            About
          </Heading>
          <Text>
            We believe people are best served through their local communities. By crowdsourcing information related to
            your community in an organized and audited way that are visible to everyone, it can build up trust and
            empower people to take actions with confidence.
          </Text>
          <Heading as='h3' marginTop={8} size='sm'>
            Disclaimer
          </Heading>
          <Text>
            In this demo, you will be logged in with the profile of one of our developers. None of your votes or created
            posts will be saved. The posts you see are made up, and should not be taken seriously.
          </Text>
          <Button marginTop={8} ref={showDemoButtonRef} onClick={onClose} variantColor='green'>
            Show the demo
          </Button>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
