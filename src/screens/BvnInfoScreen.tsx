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

export default function BvnInfoScreen() {
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
    restaurantName: Yup.string().required('Restaurant Name is required'),
    restaurantDescription: Yup.string().required(
      'Restaurant Description is required'
    ),
    restaurantEmail: Yup.string()
      .email('Invalid email')
      .required('Restaurant Email is required'),
    restaurantPhoneNumber: Yup.string().required(
      'Restaurant Phone number is required'
    ),
    adminPhoneNumber: Yup.string().required('Admin Phone number is required'),
    restaurantAddress: Yup.string().required('Restaurant Address is required'),
  });

  const formik = useFormik({
    initialValues: {
      restaurantName: accountOpeningData.restaurantName || '',
      restaurantDescription: accountOpeningData.restaurantDescription || '',
      restaurantEmail: accountOpeningData.restaurantEmail || '',
      restaurantPhoneNumber: accountOpeningData.restaurantPhoneNumber || '',
      adminPhoneNumber: accountOpeningData.adminPhoneNumber || '',
      restaurantAddress: accountOpeningData.restaurantAddress || '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      navigation.navigate('BvnUploadScreen');
    },
  });

  const validateEmail = (email: string) => {
    const isValidEmail = Yup.string().email().isValidSync(email);
    if (!isValidEmail) {
      formik.setFieldError('email', 'Invalid email');
    }
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const isValidPhoneNumber = /^\d{11}$/.test(phoneNumber);
    if (!isValidPhoneNumber) {
      formik.setFieldError('phoneNumber', 'Invalid email');
    }
  };

  return (
    <LayoutComponent isIcon label='RESTAURANT DETAILS'>
      <ScrollBox
        backgroundColor='white'
        bounces={false}
        flex={1}
        paddingHorizontal='md'
      >
        <Box marginBottom='sl' marginTop='sm'>
          <SimpleInput
            keyboardType='default'
            label='RESTAURANT  NAME'
            onChangeText={(value: string) => {
              formik.handleChange('restaurantName')(value);
              setAccountOpeningData({
                ...accountOpeningData,
                restaurantName: value,
              });
            }}
            placeholder='Enter Restaurant Name'
            value={accountOpeningData?.restaurantName}
          />
          {formik.touched.restaurantName && formik.errors.restaurantName && (
            <Text variant='medium12' color='error'>
              {formik.errors.restaurantName}
            </Text>
          )}
          <SimpleInput
            label='RESTAURANT DESCRIPTION'
            maxLength={100}
            onChangeText={(value: string) => {
              formik.handleChange('restaurantDescription')(value);
              setAccountOpeningData({
                ...accountOpeningData,
                restaurantDescription: value,
              });
            }}
            value={Capitalize(accountOpeningData?.restaurantDescription)}
          />
          {formik.touched.restaurantDescription &&
            formik.errors.restaurantDescription && (
              <Text variant='medium12' color='error'>
                {formik.errors.restaurantDescription}
              </Text>
            )}
          <SimpleInput
            label='RESTAURANT EMAIL'
            maxLength={50}
            onChangeText={(value: string) =>
              setAccountOpeningData({
                ...accountOpeningData,
                restaurantEmail: value,
              })
            }
            value={accountOpeningData?.restaurantEmail}
          />
          {formik.touched.restaurantEmail && formik.errors.restaurantEmail && (
            <Text variant='medium12' color='error'>
              {formik.errors.restaurantEmail}
            </Text>
          )}
          <CountryCodeSelectButton
            data={newCountryCode}
            inputLabel='RESTAURANT PHONE NUMBER'
            inPutMaxLength={11}
            inPutOnChangeText={(value: string) => {
              setAccountOpeningData({
                ...accountOpeningData,
                restaurantPhoneNumber: value,
              });
            }}
            inPutValue={accountOpeningData?.restaurantPhoneNumber}
            keyboardType='numeric'
            label='Code'
            onChangeText={(value) =>
              setAccountOpeningData({
                ...accountOpeningData,
                countryCode: value?.dial_code,
              })
            }
            searchData={searchData}
            setSearchData={(value) => setSearchData(value)}
            value={
              accountOpeningData?.countryCode
                ? accountOpeningData?.countryCode
                : '+234'
            }
          />
          {formik.touched.restaurantPhoneNumber &&
            formik.errors.restaurantPhoneNumber && (
              <Text variant='medium12' color='error'>
                {formik.errors.restaurantPhoneNumber}
              </Text>
            )}
          <CountryCodeSelectButton
            data={newCountryCode}
            inputLabel='ADMIN PHONE NUMBER'
            inPutMaxLength={11}
            inPutOnChangeText={(value: string) => {
              setAccountOpeningData({
                ...accountOpeningData,
                adminPhoneNumber: value,
              });
            }}
            inPutValue={accountOpeningData?.adminPhoneNumber}
            keyboardType='numeric'
            label='Code'
            onChangeText={(value) =>
              setAccountOpeningData({
                ...accountOpeningData,
                nokCountryCode: value?.dial_code,
              })
            }
            searchData={searchData}
            setSearchData={(value) => setSearchData(value)}
            value={
              accountOpeningData?.nokCountryCode
                ? accountOpeningData?.nokCountryCode
                : '+234'
            }
          />
          {formik.touched.adminPhoneNumber &&
            formik.errors.adminPhoneNumber && (
              <Text variant='medium12' color='error'>
                {formik.errors.adminPhoneNumber}
              </Text>
            )}
          <SimpleInput
            label='RESTAURANT ADDRESS'
            maxLength={100}
            onChangeText={(value: string) =>
              setAccountOpeningData({
                ...accountOpeningData,
                restaurantAddress: value,
              })
            }
            value={Capitalize(accountOpeningData?.restaurantAddress)}
          />
          {formik.touched.restaurantAddress &&
            formik.errors.restaurantAddress && (
              <Text variant='medium12' color='error'>
                {formik.errors.restaurantAddress}
              </Text>
            )}
          <Box marginBottom='xxl' />
          <Box marginBottom='sl' marginTop='xl'>
            <NextButton
              label={'Continue'}
              onPress={() => navigation.navigate('BvnUploadScreen')}
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
