import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { Box, CSSReset, ThemeProvider } from '@chakra-ui/core';

import { TabBar } from '../components/TabBar';

import { ROUTER_BASENAME } from './router';
import { theme } from './styles';
import { authTokenChecked, LOCAL_STORAGE_AUTH_TOKEN_KEY } from '../features/user/userSlice';

export const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const authTokenExists = !!localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
    dispatch(authTokenChecked({ authTokenExists }));
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <HashRouter basename={ROUTER_BASENAME}>
        <Box marginTop={4}>
          <TabBar />
        </Box>
      </HashRouter>
    </ThemeProvider>
  );
};
