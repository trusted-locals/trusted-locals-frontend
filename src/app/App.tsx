import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HashRouter, Router } from 'react-router-dom';
import { Box, CSSReset, ThemeProvider } from '@chakra-ui/core';

import { TabBar } from '../components/TabBar';

import { history, ROUTER_BASENAME } from './router';
import { theme } from './styles';
import { authTokenChecked } from '../features/user/userSlice';

export const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // const authTokenExists = !!localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
    // TODO: Preliminary.
    dispatch(authTokenChecked({ authTokenExists: true }));
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <HashRouter basename={ROUTER_BASENAME}>
        <Router history={history}>
          <Box marginBottom={24}>
            <TabBar />
          </Box>
        </Router>
      </HashRouter>
    </ThemeProvider>
  );
};
