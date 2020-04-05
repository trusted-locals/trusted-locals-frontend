import React from 'react';
import { MdAdd, MdHome, MdPerson } from 'react-icons/md';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { BoxProps, DefaultTheme, theme as chakraTheme } from '@chakra-ui/core';

export const responsiveBoxProps: BoxProps = {
  marginTop: [4, 4, 8],
  marginX: 'auto',
  width: [
    '80%', // base
    '90%', // 480px upwards
    '90%', // 768px upwards
    '80%', // 992px upwards
    '70%',
  ],
};

export type ThemeType = DefaultTheme & {
  icons: DefaultTheme['icons'];
};

const VIEW_BOX = '0 0 16 16';

export const theme: ThemeType = {
  ...chakraTheme,
  icons: {
    ...chakraTheme.icons,
    ioMdEye: {
      path: <IoMdEye />,
      viewBox: VIEW_BOX,
    },
    ioMdEyeOff: {
      path: <IoMdEyeOff />,
      viewBox: VIEW_BOX,
    },
    mdAdd: {
      path: <MdAdd />,
      viewBox: VIEW_BOX,
    },
    mdHome: {
      path: <MdHome />,
      viewBox: VIEW_BOX,
    },
    mdPerson: {
      path: <MdPerson />,
      viewBox: VIEW_BOX,
    },
  },
};
