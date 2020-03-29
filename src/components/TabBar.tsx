import React, { FC, lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
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

const FEED_PATH = '/';
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
      <Box minHeight='inherit' padding='2rem'>
        <Box
          display='flex'
          flexDirection='column'
          margin='0 auto'
          width={[
            '100%', // base
            '90%', // 480px upwards
            '90%', // 768px upwards
            '80%', // 992px upwards
            '70%',
          ]}
        >
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
          </Switch>
        </Box>
      </Box>

      <nav>
        <Box borderTop='1px solid lightgray' bottom='0' display='flex' position='fixed' width='100%'>
          {buttons.map((buttonProps) => (
            <Box flex='1 1 0' key={buttonProps.name}>
              <TabBarButton {...buttonProps} isActive={location.pathname === buttonProps.to} />
            </Box>
          ))}
        </Box>
      </nav>
    </>
  );
};
