import React, { FC, lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { Box, IconButtonProps } from '@chakra-ui/core';

import { DelayedFallback } from './DelayedFallback';
import { FeedPage } from '../features/feed/FeedPage';
import { TabBarButton } from './TabBarButton';

import { selectIsLoggedIn } from '../features/user/userSlice';

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

const FEED_PATH = '/feed';
const SUBMIT_PATH = '/submit';
const PROFILE_PATH = '/profile';
const LOGIN_PATH = '/login';
export const RESET_PASSWORD_PATH = '/login/reset-password';
const REGISRATION_PATH = '/register';

const buttons: {
  [key: string]: {
    ariaLabel: string;
    icon: IconButtonProps['icon'];
    name: string;
    to: string;
  };
} = {
  home: { ariaLabel: 'home button', icon: 'view', name: 'Home', to: FEED_PATH },
  submit: { ariaLabel: 'submit button', icon: 'plus-square', name: 'Submit', to: SUBMIT_PATH },
  profile: { ariaLabel: 'profile button', icon: 'settings', name: 'Profile', to: PROFILE_PATH },
  login: { ariaLabel: 'login button', icon: 'settings', name: 'Login', to: LOGIN_PATH },
  register: { ariaLabel: 'registration button', icon: 'settings', name: 'Register', to: REGISRATION_PATH },
};

const loggedInButtons = {
  home: buttons.home,
  submit: buttons.submit,
  profile: buttons.profile,
};

const loggedOutButtons = {
  home: buttons.home,
  submit: buttons.submit,
  login: buttons.login,
  register: buttons.register,
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
        <Route path={FEED_PATH}>
          <FeedPage />
        </Route>
        <Route path={SUBMIT_PATH}>
          <Suspense fallback={<DelayedFallback />}>
            <Submit />
          </Suspense>
        </Route>
        <Route path={PROFILE_PATH}>
          <Suspense fallback={<DelayedFallback />}>
            <Profile />
          </Suspense>
        </Route>
        <Route path={RESET_PASSWORD_PATH}>
          <Suspense fallback={<DelayedFallback />}>
            <ResetPassword />
          </Suspense>
        </Route>
        <Route path={LOGIN_PATH}>
          <Suspense fallback={<DelayedFallback />}>
            <Login />
          </Suspense>
        </Route>
        <Route path={REGISRATION_PATH}>
          <Suspense fallback={<DelayedFallback />}>
            <Registration />
          </Suspense>
        </Route>
        <Redirect from='/' to={FEED_PATH} />
      </Switch>

      <nav>
        <Box border='1px solid' borderColor='gray.300' bottom='0' display='flex' position='fixed' width='100%'>
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
