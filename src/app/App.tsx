import React, { FC, useEffect, useState } from 'react';
import { HashRouter, Router } from 'react-router-dom';
import { Box, CSSReset, ThemeProvider } from '@chakra-ui/core';

import { TabBar } from '../components/TabBar';

import { WelcomeDrawer } from './WelcomeDrawer';

import { history, ROUTER_BASENAME } from './router';
import { theme } from './styles';

const DID_SEE_WELCOME_DRAWER_KEY = 'did-see-welcome-drawer-01';

export const App: FC = () => {
  const [shouldShowDrawer, setShouldShowDrawer] = useState(false);

  const onWelcomeDrawerClose = (): void => {
    localStorage.setItem(DID_SEE_WELCOME_DRAWER_KEY, 'true');
    setShouldShowDrawer(false);
  };

  useEffect((): void => {
    const value = localStorage.getItem(DID_SEE_WELCOME_DRAWER_KEY);
    console.log(value);
    setShouldShowDrawer(value !== 'true');
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <HashRouter basename={ROUTER_BASENAME}>
        <Router history={history}>
          <WelcomeDrawer onClose={onWelcomeDrawerClose} visible={shouldShowDrawer} />
          <Box marginBottom={24}>
            <TabBar />
          </Box>
        </Router>
      </HashRouter>
    </ThemeProvider>
  );
};
