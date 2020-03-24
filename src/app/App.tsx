import React, { FC, lazy, Suspense } from 'react';
import { HashRouter, Link, Route, Switch } from 'react-router-dom';
import { Box, CSSReset, theme, ThemeProvider } from '@chakra-ui/core';

import { RootPage } from '../pages/RootPage';

import { DelayedFallback } from '../components/DelayedFallback';

const LoginPage = lazy(() =>
  import('../pages/LoginPage').then(({ LoginPage }) => ({
    default: LoginPage,
  })),
);

const RegistrationPage = lazy(() =>
  import('../pages/RegistrationPage').then(({ RegistrationPage }) => ({
    default: RegistrationPage,
  })),
);

const ROOT_PATH = '/';
const LOGIN_PATH = '/login';
const REGISRATION_PATH = '/register';

export const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
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
          <HashRouter basename='/'>
            <nav>
              <ul>
                <li>
                  <Link to={ROOT_PATH}>Home</Link>
                </li>
                <li>
                  <Link to={LOGIN_PATH}>Login</Link>
                </li>
                <li>
                  <Link to={REGISRATION_PATH}>Register</Link>
                </li>
              </ul>
            </nav>

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
              <Route path={ROOT_PATH}>
                <RootPage />
              </Route>
            </Switch>
          </HashRouter>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
