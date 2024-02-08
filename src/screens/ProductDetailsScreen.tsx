import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useIsMutating } from 'react-query';
import ProgressLoader from 'rn-progress-loader';
import { Box, LayoutComponent, ScrollBox } from '../components/Base';
import { NextButton, PreviousButton } from '../components/Button';
import CountryCodeSelectButton from '../components/Button/CountryCodeSelectButton';
import SimpleInput from '../components/Input/SimpleInput';
import { Capitalize } from '../utils/helpers';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import useStore from '../store/useStore';
import { countryCode } from '../constants/countryCode';
import { Text } from '../components/Typography';
import SelectButton from '../components/Button/SelectButton';
import { screenHeight } from '../constants';

export default function ProductDetailsScreen() {
  const navigation = useNavigation();
  const isMutation = useIsMutating();
  const [searchData, setSearchData] = useState('');
  const { accountOpeningData, setAccountOpeningData } = useStore(
    (state) => state
  );

  const newCountryCode = countryCode.filter((item: any) =>
    item?.name?.toLocaleLowerCase().includes(searchData.toLocaleLowerCase())
  );

  const validationSchema = Yup.object().shape({
    productDescription: Yup.string().required(
      'Product Description is required'
    ),
    productCategory: Yup.string().required('Product Category is required'),
    uniqueSellingPoints: Yup.string().required(
      'Unique Unit of Selling is required'
    ),
  });

  const formik = useFormik({
    initialValues: {
      productDescription: accountOpeningData.productDescription || '',
      productCategory: accountOpeningData.productCategory || '',
      uniqueSellingPoints: accountOpeningData.uniqueSellingPoints || '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      navigation.navigate('DeliveryPreferenceScreen');
    },
  });

  return (
    <LayoutComponent isIcon label='PRODUCTS DETAILS'>
      <ScrollBox
        backgroundColor='white'
        bounces={false}
        flex={1}
        paddingHorizontal='md'
      >
        <Box marginBottom='sl' marginTop='sm'>
          <SimpleInput
            keyboardType='default'
            label='PRODUCTS OR SERVICES OFFERED DESCRIPTION'
            onChangeText={(value: string) => {
              formik.handleChange('productDescription')(value);
              setAccountOpeningData({
                ...accountOpeningData,
                productDescription: value,
              });
            }}
            placeholder='Enter Restaurant Name'
            value={accountOpeningData?.productDescription}
          />
          {formik.touched.productDescription &&
            formik.errors.productDescription && (
              <Text variant='medium12' color='error'>
                {formik.errors.productDescription}
              </Text>
            )}

          <SelectButton
            data={[
              'Fruits and veggies',
              'Frozen foods and butchery',
              'Rice & Pasta',
              'Food cupboard',
              'Dairy products',
              'Condiments and sauces',
              'Drinks',
              'Confectionery (biscuits & ice cream)',
              'Toiletries',
              'Skin care',
              'Bakery and cakes',
              'Mother & child care',
              'Baby nursery (car sit, baby changing mat)',
              'Toys',
              'Pet shop',
              'Sport essentials',
              'Car essentials',
              'Kitchen wares',
              'Crockery',
              'Cleaning aids',
              'Tobacco',
              'Stationaries',
              'Electronic appliances/gadgets and accessories',
              'Pharmacy',
            ]}
            label='CATEGORY OF PRODUCTS'
            onChangeText={(value) => {
              formik.handleChange('productDescription')(value);
              setAccountOpeningData({
                ...accountOpeningData,
                productCategory: value,
              });
            }}
            value={accountOpeningData?.productCategory}
          />
          {formik.touched.productCategory && formik.errors.productCategory && (
            <Text variant='medium12' color='error'>
              {formik.errors.productCategory}
            </Text>
          )}

          <SimpleInput
            label='SPECIALTY OR UNIQUE SELLING POINTS'
            maxLength={100}
            onChangeText={(value: string) => {
              formik.handleChange('restaurantDescription')(value);
              setAccountOpeningData({
                ...accountOpeningData,
                uniqueSellingPoints: value,
              });
            }}
            value={accountOpeningData?.uniqueSellingPoints}
          />
          {formik.touched.uniqueSellingPoints &&
            formik.errors.uniqueSellingPoints && (
              <Text variant='medium12' color='error'>
                {formik.errors.uniqueSellingPoints}
              </Text>
            )}

          <Box marginBottom='xl' height={screenHeight * 0.15} />
          <Box marginBottom='xl' marginTop='xl'>
            <NextButton
              label={'Continue'}
              onPress={() => navigation.navigate('DeliveryPreferenceScreen')}
            />
          </Box>
          <Box marginBottom='sl'>
            <PreviousButton onPress={() => navigation.goBack()} />
          </Box>
        </Box>
      </ScrollBox>
      <ProgressLoader
        color='#FFFFFF'
        hudColor='#000000'
        isHUD
        isModal
        visible={isMutation > 0}
      />
    </LayoutComponent>
  );
}
