import React, { FC, lazy } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Switch, useLocation } from 'react-router-dom';
import { Box, IconButtonProps } from '@chakra-ui/core';

import { AppRoute } from '../app/AppRoute';
import { FeedPage } from '../features/feed/FeedPage';
import { TabBarButton } from './TabBarButton';

import { selectIsLoggedIn } from '../features/user/userSlice';

import { AppRoutes } from '../app/router';

const FEED_PATH: AppRoutes = '/feed';

const Submit = lazy(() =>
  import('../features/submit/Submit').then(({ Submit }) => ({
    default: Submit,
  })),
);

const Profile = lazy(() =>
  import('../features/user/Profile').then(({ Profile }) => ({
    default: Profile,
  })),
);

const Account = lazy(() =>
  import('../features/user/Account').then(({ Account }) => ({
    default: Account,
  })),
);

const Login = lazy(() =>
  import('../features/user/Login').then(({ Login }) => ({
    default: Login,
  })),
);

const ResetPassword = lazy(() =>
  import('../features/user/ResetPassword').then(({ ResetPassword }) => ({
    default: ResetPassword,
  })),
);

const Registration = lazy(() =>
  import('../features/user/Registration').then(({ Registration }) => ({
    default: Registration,
  })),
);

const Page404 = lazy(() =>
  import('./Page404').then(({ Page404 }) => ({
    default: Page404,
  })),
);

const buttons: {
  [key: string]: {
    ariaLabel: string;
    icon: IconButtonProps['icon'];
    name: string;
    to: AppRoutes;
  };
} = {
  home: { ariaLabel: 'home button', icon: 'view', name: 'Home', to: '/feed' },
  submit: { ariaLabel: 'submit button', icon: 'plus-square', name: 'Submit', to: '/submit' },
  profile: { ariaLabel: 'profile button', icon: 'settings', name: 'Profile', to: '/profile' },
  account: { ariaLabel: 'account button', icon: 'settings', name: 'Account', to: '/account' },
};

const loggedInButtons = {
  home: buttons.home,
  submit: buttons.submit,
  profile: buttons.profile,
};

const loggedOutButtons = {
  home: buttons.home,
  submit: buttons.submit,
  account: buttons.account,
};

const getButtons = (loggedIn: boolean): typeof buttons[number][] =>
  Object.values(loggedIn ? loggedInButtons : loggedOutButtons);

export const TabBar: FC<{}> = () => {
  const location = useLocation();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const buttons = getButtons(isLoggedIn);

  return (
    <>
      <Switch>
        <AppRoute lazyload={false} path='/feed'>
          <FeedPage />
        </AppRoute>
        <AppRoute lazyload path='/submit'>
          <Submit />
        </AppRoute>
        <AppRoute
          lazyload
          path='/profile'
          redirect={{
            path: '/account',
            when: 'logged-out',
          }}
        >
          <Profile />
        </AppRoute>
        <AppRoute
          lazyload
          path='/account/reset-password'
          redirect={{
            path: '/profile',
            when: 'logged-in',
          }}
        >
          <ResetPassword />
        </AppRoute>
        <AppRoute
          lazyload
          path='/account/login'
          redirect={{
            path: '/profile',
            when: 'logged-in',
          }}
        >
          <Login />
        </AppRoute>
        <AppRoute
          lazyload
          path='/account/register'
          redirect={{
            path: '/profile',
            when: 'logged-in',
          }}
        >
          <Registration />
        </AppRoute>
        <AppRoute
          lazyload
          path='/account'
          redirect={{
            path: '/profile',
            when: 'logged-in',
          }}
        >
          <Account />
        </AppRoute>
        <Redirect exact from='/' to={FEED_PATH} />
        <AppRoute lazyload path={null}>
          <Page404 />
        </AppRoute>
      </Switch>

      <nav>
        <Box borderTop='1px solid' borderColor='gray.300' bottom='0' display='flex' position='fixed' width='100%'>
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
