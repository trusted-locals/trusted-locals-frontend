import React, { FC } from 'react';
import { Link, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { Box, Tab, TabList, TabPanels, Tabs } from '@chakra-ui/core';

import { Feed } from './Feed';
import { FeedHeader } from './FeedHeader';

const ARIA_TABS = 'tabs';
const ARIA_NEWS_TAB = 'tabs-news-tab';
const ARIA_MEDICAL_SUPPLY_TAB = 'tabs-medical-supply-tab';
const ARIA_GROCERY_TAB = 'tabs-grocery-tab';
const ARIA_ADVICE_TAB = 'tabs-advice-tab';

const NEWS_PATH = '/feed/news';
const MEDICAL_SUPPLY_PATH = '/feed/medical-supply';
const GROCERY_PATH = '/feed/grocery';
const ADVICE_PATH = '/feed/advice';

const tabs: {
  id: string;
  name: string;
  to: string;
}[] = [
  { id: ARIA_NEWS_TAB, name: 'News', to: NEWS_PATH },
  { id: ARIA_MEDICAL_SUPPLY_TAB, name: 'Medical Supply', to: MEDICAL_SUPPLY_PATH },
  { id: ARIA_GROCERY_TAB, name: 'Grocery', to: GROCERY_PATH },
  { id: ARIA_ADVICE_TAB, name: 'Advice', to: ADVICE_PATH },
];

const tabsProps = {
  marginTop: 6,
};

type TabsWrapperProps = {
  children: React.ReactNode;
};

// Workaround for showing smaller text on mobile.
const TabsWrapper: FC<TabsWrapperProps> = ({ children }: TabsWrapperProps) => (
  <>
    <Box display={['block', 'none']}>
      <Tabs {...tabsProps} size='sm'>
        {children}
      </Tabs>
    </Box>
    <Box display={['none', 'block']}>
      <Tabs {...tabsProps} size='md'>
        {children}
      </Tabs>
    </Box>
  </>
);

export const FeedPage: FC = () => {
  const { pathname } = useLocation();

  return (
    <>
      <FeedHeader />
      <TabsWrapper>
        <TabList id={ARIA_TABS}>
          {tabs.map(({ id, name, to }) => (
            <Tab
              aria-controls={ARIA_TABS}
              aria-selected={pathname === to}
              as={Link}
              id={id}
              key={name}
              tabIndex={0}
              to={to}
            >
              {name}
            </Tab>
          ))}
        </TabList>

        <TabPanels marginTop={8}>
          <Switch>
            {tabs.map(({ name, to }) => (
              <Route exact key={name} path={to}>
                <Feed type={name} />
              </Route>
            ))}
            <Redirect from='/' to={NEWS_PATH} />
          </Switch>
        </TabPanels>
      </TabsWrapper>
    </>
  );
};
