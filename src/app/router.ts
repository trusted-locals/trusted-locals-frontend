import { createHashHistory } from 'history';

export const ROUTER_BASENAME = '/';

export const history = createHashHistory({ basename: ROUTER_BASENAME });
