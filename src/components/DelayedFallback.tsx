import React, { FC, useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/core';

export const DelayedFallback: FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 500);
    return (): void => {
      clearTimeout(timeout);
    };
  }, []);

  return <>{show && <Spinner label='Loading...' />}</>;
};
