import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import {
  Box,
  KeyBoardAwareScrollBox,
  LayoutComponent,
} from '../components/Base';
import SimpleInput from '../components/Input/SimpleInput';
import useStore from '../store/useStore';
import SelectButton from '../components/Button/SelectButton';
import ImagePickerButton from '../components/Button/ImagePickerButton';
import NextButton from '../components/Button/PreviousButton';
import { RFValue } from 'react-native-responsive-fontsize';
import { resetNavigation } from '../navigation/ResetNavigator';
import Modal from 'react-native-modal';
import { successful } from '../assets/lottie';
import LottieView from 'lottie-react-native';
import { Text } from '../components/Typography';
import { Button } from '../components/Button';
const AddProducts = () => {
  const { addProduct, setAddProduct } = useStore((state) => state);
  const [isVisible, setIsVisble] = useState(false);
  console.log(addProduct, '====');

  const addProductToProducts = () => {
    setIsVisble(!isVisible);
  };
  return (
    <LayoutComponent label='Add Products' isIcon>
      <KeyBoardAwareScrollBox
        backgroundColor='white'
        bounces={false}
        contentContainerStyle={{ flexGrow: 1 }}
        paddingHorizontal='md'
      >
        {/* {numbersArray.map((item) => (
          <View key={item}>
            <Text>{`${item}`}</Text>
          </View>
        ))} */}

        <SimpleInput
          keyboardType='default'
          label='PRODUCT NAME'
          onChangeText={(value: string) => {
            setAddProduct({ ...addProduct, name: value });
          }}
          placeholder='Enter Product Name'
          value={addProduct?.name}
        />
        <SimpleInput
          keyboardType='default'
          label='PRODUCT BRAND'
          onChangeText={(value: string) => {
            setAddProduct({ ...addProduct, brand: value });
          }}
          placeholder='Enter Product Brand'
          value={addProduct?.brand}
        />
        <SimpleInput
          keyboardType='numeric'
          label='PRODUCT STOCK'
          onChangeText={(value: string) => {
            setAddProduct({ ...addProduct, stock: value });
          }}
          placeholder='Enter Product Stock'
          value={addProduct?.stock}
        />
        <SimpleInput
          keyboardType='numeric'
          label='PRODUCT PRICE'
          onChangeText={(value: string) => {
            setAddProduct({ ...addProduct, price: value });
          }}
          placeholder='Enter Product Price'
          value={addProduct?.price}
        />
        <SimpleInput
          keyboardType='numeric'
          label='PRODUCT DISCOUNT'
          onChangeText={(value: string) => {
            setAddProduct({ ...addProduct, discount: value });
          }}
          placeholder='Enter Product Discount (0 if none)'
          value={addProduct?.discount}
        />
        <SimpleInput
          keyboardType='default'
          label='PRODUCT DESCRIPTION'
          onChangeText={(value: string) => {
            setAddProduct({ ...addProduct, description: value });
          }}
          placeholder='Enter Product Description'
          value={addProduct?.description}
        />
        <SelectButton
          data={[
            'Dairy and Eggs',
            'Meat and Poultry',
            'Seafood',
            'Produce (Fruits and Vegetables)',
            'Bakery and Bread',
            'Canned and Jarred Goods',
            'Frozen Foods',
            'Snacks and Sweets',
            'Beverages',
            'Condiments, Sauces, and Spices',
            'Grains, Pasta, and Rice',
            'Nuts and Seeds',
            'Desserts and Baking',
            'Health Foods',
            'International Foods',
            'Organic and Natural Products',
            'Baby and Toddler Food',
            'Pet Food',
            'Miscellaneous',
          ]}
          label='PRODUCT CATEGORY'
          onChangeText={(value) =>
            setAddProduct({
              ...addProduct,
              category: value,
            })
          }
          value={addProduct?.category}
        />

        <ImagePickerButton
          label='UPLOAD PRODUCT IMAGE'
          onChange={(value) => {
            setAddProduct({
              ...addProduct,
              productImg: value.base64,
              productImgName: value.fileName,
            });
          }}
          value={addProduct?.productImg}
        />

        <Box marginBottom='sl' marginTop='xl'>
          <Button
            backgroundColor={'primary'}
            label='ADD PRODUCT'
            onPress={addProductToProducts}
          />
        </Box>
      </KeyBoardAwareScrollBox>

      <Modal isVisible={isVisible}>
        <Box
          alignItems='center'
          backgroundColor='white'
          borderRadius={10}
          justifyContent='center'
          padding='sm'
        >
          <Box height={RFValue(150)} width='100%'>
            <LottieView autoPlay loop source={successful} />
          </Box>

          <Text
            color='black'
            marginBottom='sm'
            marginTop='sm'
            variant='medium14'
          >
            Congratulations
          </Text>
          <Text
            color='black'
            marginBottom='sm'
            textAlign='center'
            variant='regular14'
          >
            Product Added Successfully
          </Text>
          <Box
            marginBottom='xxl'
            marginTop='sm'
            style={{ width: RFValue(100) }}
          >
            <Button
              backgroundColor={'primary'}
              label='Done'
              onPress={() => {
                setAddProduct({});
                resetNavigation('ProductRoot');
              }}
            />
          </Box>
        </Box>
      </Modal>
    </LayoutComponent>
  );
};

export default AddProducts;

const styles = StyleSheet.create({});
