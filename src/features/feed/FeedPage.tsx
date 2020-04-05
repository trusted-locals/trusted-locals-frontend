import React, { FC } from 'react';
import { Link, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { Box, Tab, TabList, TabPanels, Tabs, usePrevious } from '@chakra-ui/core';
import { useWindowWidth } from '@react-hook/window-size';

import { DetailView } from './DetailView';
import { Feed } from './Feed';
import { FeedHeader } from './FeedHeader';

import { Category } from './feedSlice';

import { responsiveBoxProps } from '../../app/styles';

import { convertWidthToEM } from '../../utils/dom-utils';

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
  category: Category;
  id: string;
  name: string;
  to: string;
}[] = [
  { category: 'news', id: ARIA_NEWS_TAB, name: 'News', to: NEWS_PATH },
  { category: 'medical_supply', id: ARIA_MEDICAL_SUPPLY_TAB, name: 'Medical Supply', to: MEDICAL_SUPPLY_PATH },
  { category: 'grocery', id: ARIA_GROCERY_TAB, name: 'Grocery', to: GROCERY_PATH },
  { category: 'advice', id: ARIA_ADVICE_TAB, name: 'Advice', to: ADVICE_PATH },
];

// Taken from theme.breakpoints
const TABS_SIZE_BREAKPOINT_EM = 30;

export const FeedPage: FC = () => {
  const { pathname } = useLocation();
  const previousPathname = usePrevious(pathname);

  // Workaround for showing smaller text on mobile.
  const widthPX = useWindowWidth(0, { leading: true, wait: 250 });
  const widthEM = convertWidthToEM(widthPX);
  const tabsSize = widthEM <= TABS_SIZE_BREAKPOINT_EM ? 'sm' : 'md';

  return (
    <Box marginTop={2}>
      <FeedHeader />
      <Tabs marginTop={[6, 6, 8]} size={tabsSize}>
        <TabList id={ARIA_TABS} {...responsiveBoxProps} width={['100%', '100%', '90%', '80%', '70%']}>
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

        <TabPanels marginTop={8} outline='none' {...responsiveBoxProps}>
          <Switch>
            {tabs.map(({ category, to }) => (
              <Route exact key={category} path={to}>
                <Feed category={category} />
              </Route>
            ))}
            <Route
              path='/feed/detail/:postID'
              render={(props): JSX.Element => <DetailView {...props} previousPathname={previousPathname} />}
            ></Route>
            <Redirect from='/' to={NEWS_PATH} />
          </Switch>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
