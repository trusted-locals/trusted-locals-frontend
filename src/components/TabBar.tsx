import React, { ComponentType, FC, lazy } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Switch, useLocation } from 'react-router-dom';
import { Box } from '@chakra-ui/core';

import { AppRoute, UserState } from '../app/AppRoute';
import { FeedPage } from '../features/feed/FeedPage';
import { TabBarButton } from './TabBarButton';
import { PageError } from './PageError';

import { selectIsLoggedIn } from '../features/user/userSlice';

import { AppRoutes } from '../app/router';
import { ThemeType } from '../app/styles';

const catchPageError = (): { default: ComponentType<any> } => ({ default: PageError });

// Unfortunately, all components have to be lazy-loaded like this.
// https://stackoverflow.com/questions/53059420/dynamic-path-import-for-lazy-loading-of-components-using-react-loadable/53060299#53060299
const Submit = lazy(() =>
  import('../features/submit/Submit')
    .then(({ Submit }) => ({
      default: Submit,
    }))
    .catch(catchPageError),
);

const Profile = lazy(() =>
  import('../features/user/Profile')
    .then(({ Profile }) => ({
      default: Profile,
    }))
    .catch(catchPageError),
);

const Account = lazy(() =>
  import('../features/user/Account')
    .then(({ Account }) => ({
      default: Account,
    }))
    .catch(catchPageError),
);

const Login = lazy(() =>
  import('../features/user/Login')
    .then(({ Login }) => ({
      default: Login,
    }))
    .catch(catchPageError),
);

const ResetPassword = lazy(() =>
  import('../features/user/ResetPassword')
    .then(({ ResetPassword }) => ({
      default: ResetPassword,
    }))
    .catch(catchPageError),
);

const Registration = lazy(() =>
  import('../features/user/Registration')
    .then(({ Registration }) => ({
      default: Registration,
    }))
    .catch(catchPageError),
);

const Page404 = lazy(() =>
  import('./Page404')
    .then(({ Page404 }) => ({
      default: Page404,
    }))
    .catch(catchPageError),
);

const buttons: {
  [key: string]: {
    ariaLabel: string;
    icon: keyof ThemeType['icons'];
    name: string;
    to: AppRoutes;
  };
} = {
  home: { ariaLabel: 'home button', icon: 'mdHome', name: 'Home', to: '/feed' },
  submit: { ariaLabel: 'submit button', icon: 'mdAdd', name: 'Submit', to: '/submit' },
  profile: { ariaLabel: 'profile button', icon: 'mdPerson', name: 'Profile', to: '/profile/me' },
  account: { ariaLabel: 'account button', icon: 'mdPerson', name: 'Account', to: '/account' },
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
          path='/profile/me'
          redirect={{
            path: '/account',
            when: UserState.LoggedOut,
          }}
        >
          <Profile />
        </AppRoute>
        <AppRoute
          lazyload
          path='/account/reset-password'
          redirect={{
            path: '/profile/me',
            when: UserState.LoggedIn,
          }}
        >
          <ResetPassword />
        </AppRoute>
        <AppRoute
          lazyload
          path='/account/login'
          redirect={{
            path: '/profile/me',
            when: UserState.LoggedIn,
          }}
        >
          <Login />
        </AppRoute>
        <AppRoute
          lazyload
          path='/account/register'
          redirect={{
            path: '/profile/me',
            when: UserState.LoggedIn,
          }}
        >
          <Registration />
        </AppRoute>
        <AppRoute
          lazyload
          path='/account'
          redirect={{
            path: '/profile/me',
            when: UserState.LoggedIn,
          }}
        >
          <Account />
        </AppRoute>
        <Redirect exact from='/profile' to={'/profile/me' as AppRoutes} />
        <AppRoute lazyload path='/profile'>
          <Profile />
        </AppRoute>
        <Redirect exact from='/' to={'/feed' as AppRoutes} />
        <AppRoute lazyload path={null}>
          <Page404 />
        </AppRoute>
      </Switch>

      <nav>
        <Box
          backgroundColor='white'
          borderTop='1px solid'
          borderColor='gray.300'
          bottom='0'
          display='flex'
          position='fixed'
          width='100%'
          zIndex={1}
        >
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
