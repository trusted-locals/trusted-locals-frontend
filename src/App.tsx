import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { CSSReset, theme, ThemeProvider } from '@chakra-ui/core';

import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { RootPage } from './pages/RootPage';

const ROOT_PATH = '/';
const LOGIN_PATH = '/login';
const REGISRATION_PATH = '/register';

export const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Router>
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
            <LoginPage />
          </Route>
          <Route path={REGISRATION_PATH}>
            <RegistrationPage />
          </Route>
          <Route path={ROOT_PATH}>
            <RootPage />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};
