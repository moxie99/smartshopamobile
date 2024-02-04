import Box from './Box';
import { Text } from '../Typography';
import React from 'react';

const TextBlock = ({
  body,
  head,
}: {
  body: string | undefined;
  head: string;
}) => (
  <>
    <Box
      backgroundColor='harsh'
      borderRadius={10}
      marginBottom='sml'
      paddingBottom='md'
      paddingHorizontal='sm'
      paddingTop='sm'
      style={{ height: 70 }}
      width='100%'
    >
      <Text
        fontSize={10}
        marginBottom='sml'
        textTransform='uppercase'
        variant='regular14'
      >
        {head}
      </Text>
      <Text numberOfLines={1} variant='regular14'>
        {body}
      </Text>
    </Box>
    <Text color='fadeBlue' marginBottom='sm' variant='regular14'>
      Not editable
    </Text>
  </>
);

export default TextBlock;
