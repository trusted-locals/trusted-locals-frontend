import React, { FC, ReactElement, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import { DelayedFallback } from '../components/DelayedFallback';

import { selectIsLoggedIn } from '../features/user/userSlice';

import { AppRoutes } from './router';

type Props = {
  children: ReactElement;
  lazyload: boolean;
  path: AppRoutes | null;
  redirect?: {
    path: AppRoutes;
    when: 'logged-in' | 'logged-out';
  };
};

export const AppRoute: FC<Props> = ({ children, lazyload, path, redirect }: Props) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const shouldRedirect =
    (redirect?.when === 'logged-in' && isLoggedIn) || (redirect?.when === 'logged-out' && !isLoggedIn);
  if (shouldRedirect) {
    return <Redirect to={{ pathname: redirect?.path }} />;
  }

  const Component = <Route path={path || ''}>{children}</Route>;
  return lazyload ? <Suspense fallback={<DelayedFallback />}>{Component}</Suspense> : Component;
};
