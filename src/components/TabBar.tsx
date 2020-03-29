import React, { FC, lazy, Suspense } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { Box, IconButtonProps } from '@chakra-ui/core';

import { DelayedFallback } from './DelayedFallback';
import { FeedPage } from '../features/feed/FeedPage';
import { TabBarButton } from './TabBarButton';

const LoginPage = lazy(() =>
  import('../features/user/LoginPage').then(({ LoginPage }) => ({
    default: LoginPage,
  })),
);

const RegistrationPage = lazy(() =>
  import('../features/user/RegistrationPage').then(({ RegistrationPage }) => ({
    default: RegistrationPage,
  })),
);

const FEED_PATH = '/feed';
const LOGIN_PATH = '/login';
const REGISRATION_PATH = '/register';

const buttons: {
  ariaLabel: string;
  icon: IconButtonProps['icon'];
  name: string;
  to: string;
}[] = [
  { ariaLabel: 'home button', icon: 'email', name: 'Home', to: FEED_PATH },
  { ariaLabel: 'login button', icon: 'chat', name: 'Login', to: LOGIN_PATH },
  { ariaLabel: 'registration button', icon: 'lock', name: 'Register', to: REGISRATION_PATH },
];

export const TabBar: FC<{}> = () => {
  const location = useLocation();

  return (
    <>
      <Switch>
        <Route path={LOGIN_PATH}>
          <Suspense fallback={<DelayedFallback />}>
            <LoginPage />
          </Suspense>
        </Route>
        <Route path={REGISRATION_PATH}>
          <Suspense fallback={<DelayedFallback />}>
            <RegistrationPage />
          </Suspense>
        </Route>
        <Route path={FEED_PATH}>
          <FeedPage />
        </Route>
        <Redirect from='/' to={FEED_PATH} />
      </Switch>

      <nav>
        <Box borderTop='1px solid lightgray' bottom='0' display='flex' position='fixed' width='100%'>
          {buttons.map((buttonProps) => (
            <Box flex='1 1 0' key={buttonProps.name}>
              <TabBarButton {...buttonProps} isActive={location.pathname.startsWith(buttonProps.to)} />
            </Box>
          ))}
        </Box>
      </nav>
    </>
  );
};
