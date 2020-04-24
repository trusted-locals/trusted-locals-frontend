import React, { FC } from 'react';
import { HashRouter, Router } from 'react-router-dom';
import { Box, CSSReset, ThemeProvider } from '@chakra-ui/core';

import { TabBar } from '../components/TabBar';

import { history, ROUTER_BASENAME } from './router';
import { theme } from './styles';

export const App: FC = () => {
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
