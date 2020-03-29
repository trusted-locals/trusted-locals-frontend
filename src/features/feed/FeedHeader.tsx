import React, { FC } from 'react';
import { Box, Icon, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/core';

type Props = {};

const INPUT_PLACEHOLDER = 'Use keywords to search for information';

const NAME_PLACEHOLDER = 'Timothy';
const LOCATION_PLACEHOLDER = 'Richmond';

const Location: FC<{}> = () => (
  <Text as='a' fontWeight='semibold' textDecoration='underline'>
    {LOCATION_PLACEHOLDER}
  </Text>
);

export const FeedHeader: FC<Props> = (_props: Props) => (
  <Box paddingX={4}>
    {/* TODO: Logged out */}
    <Text color='gray.600' fontSize='lg'>
      Good morning, {NAME_PLACEHOLDER}
    </Text>
    <Text color='gray.600' fontSize='lg' marginTop={1}>
      Here are the latest for <Location />
    </Text>
    <InputGroup marginTop={4}>
      <InputLeftElement>
        <Icon color='gray.400' name='search' />
      </InputLeftElement>
      <Input placeholder={INPUT_PLACEHOLDER} type='text' />
    </InputGroup>
  </Box>
);
