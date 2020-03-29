import { BoxProps } from '@chakra-ui/core';

export const responsiveBoxProps: BoxProps = {
  marginTop: 4,
  marginX: 'auto',
  width: [
    '80%', // base
    '90%', // 480px upwards
    '90%', // 768px upwards
    '80%', // 992px upwards
    '70%',
  ],
};
