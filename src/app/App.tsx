import React, { FC } from 'react';
import { HashRouter } from 'react-router-dom';
import { CSSReset, theme, ThemeProvider } from '@chakra-ui/core';

import { TabBar } from '../components/TabBar';

import { ROUTER_BASENAME } from './router';

export const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <HashRouter basename={ROUTER_BASENAME}>
        <TabBar />
      </HashRouter>
    </ThemeProvider>
  );
};
