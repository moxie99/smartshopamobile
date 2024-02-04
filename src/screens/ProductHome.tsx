import { StyleSheet } from 'react-native';
import React from 'react';
import {
  Box,
  KeyBoardAwareScrollBox,
  LayoutComponent,
} from '../components/Base';
import { PieCharts } from '../components/Cards/PieChart';
import { FontAwesome5 } from '@expo/vector-icons';
import { Text } from '../components/Typography';
import { LineCharts } from '../components/Cards/LineChart';
const ProductHome = () => {
  return (
    <LayoutComponent label='Products' isIcon>
      <KeyBoardAwareScrollBox
        backgroundColor='white'
        bounces={false}
        contentContainerStyle={{ flexGrow: 1 }}
        paddingHorizontal='md'
      >
        <Box
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          marginVertical={'md'}
          backgroundColor={'primary'}
          padding={'lg'}
          style={{ borderRadius: 10 }}
        >
          <Text variant={'bold14'} color={'white'}>
            3 Products
          </Text>
          <FontAwesome5 name='product-hunt' size={24} color='white' />
        </Box>
        <Box alignItems={'center'}>
          <PieCharts />
        </Box>
        <Box>
          <LineCharts />
        </Box>
      </KeyBoardAwareScrollBox>
    </LayoutComponent>
  );
};

export default ProductHome;

const styles = StyleSheet.create({});
