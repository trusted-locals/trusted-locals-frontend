import { PseudoBoxProps, Tab } from '@chakra-ui/core';

import { LinkProps as RouterLinkProps } from 'react-router-dom';

declare module '@chakra-ui/core' {
  const Tab: React.FC<PseudoBoxProps & React.ButtonHTMLAttributes<any> & Optional<RouterLinkProps>>;
}
