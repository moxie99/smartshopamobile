import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import {
  Box,
  Image,
  KeyBoardAwareScrollBox,
  LayoutComponent,
} from '../components/Base';
import { Text } from '../components/Typography';
import { Button } from '../components/Button';

const productData = [
  {
    id: 1,
    image:
      'https://qph.cf2.quoracdn.net/main-qimg-4f457430e72bde9b1b2a6aa1475bc0a7-lq',
    name: 'Product 1',
    category: 'Snacks and Sweets',
    brand: 'Brand A',
    price: 10.99,
    discount: 5,
    stock: 50,
  },
  {
    id: 2,
    image:
      'https://qph.cf2.quoracdn.net/main-qimg-4f457430e72bde9b1b2a6aa1475bc0a7-lq',
    name: 'Product 2',
    category: 'Bakery and Bread',
    brand: 'Brand B',
    price: 7.49,
    discount: 0,
    stock: 25,
  },

  {
    id: 20,
    image:
      'https://qph.cf2.quoracdn.net/main-qimg-4f457430e72bde9b1b2a6aa1475bc0a7-lq',
    name: 'Product 20',
    category: 'Dairy and Eggs',
    brand: 'Brand C',
    price: 5.99,
    discount: 2,
    stock: 30,
  },
];

const handleEdit = (productId: any) => {
  // Implement your edit logic here
  console.log(`Editing product with ID ${productId}`);
};

const handleDelete = (productId: any) => {
  // Implement your delete logic here
  console.log(`Deleting product with ID ${productId}`);
};

const ProductItem = ({ item }) => (
  <Box style={{ margin: 10, padding: 10, borderWidth: 1, borderColor: '#ddd' }}>
    <Box
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      paddingVertical={'sm'}
    >
      <Text variant={'medium12'}>{item.name}</Text>
      <Text variant={'medium12'}>Category: {item.category}</Text>
    </Box>
    <Box
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      paddingVertical={'sm'}
    >
      <Text variant={'medium12'}>Brand: {item.brand}</Text>
      <Text variant={'medium12'}>Price: ${item.price}</Text>
    </Box>

    <Box
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      paddingVertical={'sm'}
    >
      <Text variant={'medium12'}>Discount: {item.discount}%</Text>
      <Text variant={'medium12'}>Stock: {item.stock}</Text>
    </Box>

    <Image
      source={{ uri: item.image }}
      style={{
        width: '100%',
        height: Dimensions.get('screen').height * 0.2,
        marginBottom: 10,
      }}
    />
    <Box
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Button
        backgroundColor={'primary'}
        marginVertical={'md'}
        width={Dimensions.get('screen').width * 0.35}
        label='Edit'
        onPress={() => handleEdit(item.id)}
      />
      <Button
        backgroundColor={'error'}
        width={Dimensions.get('screen').width * 0.35}
        label='Delete'
        onPress={() => handleDelete(item.id)}
      />
    </Box>
  </Box>
);

const AllProducts = () => {
  return (
    <LayoutComponent label='ALL PRODUCTS' isIcon>
      <Box paddingBottom={'lg'} backgroundColor='white' paddingHorizontal='md'>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={productData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductItem item={item} />}
        />
      </Box>
    </LayoutComponent>
  );
};

export default AllProducts;
