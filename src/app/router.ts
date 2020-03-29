import { createHashHistory } from 'history';

export const ROUTER_BASENAME = '/';

export const history = createHashHistory({ basename: ROUTER_BASENAME });

export type AppRoutes =
  | '/'
  | '/account'
  | '/account/login'
  | '/account/register'
  | '/account/reset-password'
  | '/feed'
  | '/profile'
  | '/submit';
