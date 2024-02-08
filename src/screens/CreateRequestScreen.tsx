import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  KeyBoardAwareScrollBox,
  LayoutComponent,
} from '../components/Base';
import SimpleInput from '../components/Input/SimpleInput';
import CountryCodeSelectButton from '../components/Button/CountryCodeSelectButton';
import { countryCode } from '../constants/countryCode';
import DatePickerButton from '../components/Button/DatePickerButton';
import { NextButton, PreviousButton } from '../components/Button';
import { useIsMutating } from 'react-query';
import ProgressLoader from 'rn-progress-loader';
import { Capitalize } from '../utils/helpers';
import { Text } from '../components/Typography';
import { useNavigation } from '@react-navigation/native';
import TermsModal from '../components/Base/TermsModal';
import useStore from '../store/useStore';
import SelectButtonTitle from '../components/Button/SelectButtonTitle';
import { titleList } from '../utils/constants';
const CreateRequestScreen = () => {
  const { accountOpeningData, setAccountOpeningData } = useStore(
    (state) => state
  );

  console.log(accountOpeningData, '0000');
  const navigation = useNavigation();
  const isMutation = useIsMutating();
  const [searchData, setSearchData] = useState('');

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    residentialAddress: Yup.string().required('Address is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    title: Yup.string().required('Title/Position is required'),
    DateOfBirth: Yup.date().required('Date of Birth is required'),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])(?=\S+$).{8,}$/,
        'Invalid password: password must contain at least one uppercase, at least one lower case, at least one special character, at least one digit and at least an alphabet and no space'
      )
      .required('Password is required'),
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

  const newCountryCode = countryCode.filter((item: any) =>
    item?.name?.toLocaleLowerCase().includes(searchData.toLocaleLowerCase())
  );

  const formik = useFormik({
    initialValues: {
      name: accountOpeningData.name || '',
      email: accountOpeningData.email || '',
      residentialAddress: accountOpeningData.residentialAddress || '',
      phoneNumber: accountOpeningData.phoneNumber || '',
      DateOfBirth: accountOpeningData.DateOfBirth || null,
      password: accountOpeningData.password || '',
      title: accountOpeningData.title || '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      navigation.navigate('ProductDetailsScreen');
    },
  });

  const submit = () => {
    navigation.navigate('ProductDetailsScreen');
  };

  return (
    <LayoutComponent isIcon label='PERSONAL DETAILS'>
      <KeyBoardAwareScrollBox
        backgroundColor='white'
        bounces={false}
        contentContainerStyle={{ flexGrow: 1 }}
        paddingHorizontal='md'
      >
        <Text mt={'sm'} color='primary' fontWeight='bold' variant='bold16'>
          Please Enter Your Personal Details
        </Text>
        <SimpleInput
          keyboardType='default'
          label='FULL NAME'
          onChangeText={(value: string) => {
            formik.handleChange('name')(value);
            setAccountOpeningData({ ...accountOpeningData, name: value });
          }}
          placeholder='Enter Full Name'
          value={accountOpeningData?.name}
        />
        {formik.touched.name && formik.errors.name && (
          <Text variant={'medium12'} color='error'>
            {formik.errors.name ?? ''}
          </Text>
        )}

        <SelectButtonTitle
          data={titleList}
          label='POSITION/TITLE'
          onChangeText={(value) => {
            // formik.handleChange('title')(value);
            setAccountOpeningData({
              ...accountOpeningData,
              title: value?.title,
            });
          }}
          value={accountOpeningData?.title}
        />
        {/* {formik.touched.title && formik.errors.title && (
          <Text variant={'medium12'} color='error'>
            {formik.errors.title ?? ''}
          </Text>
        )} */}
        <SimpleInput
          keyboardType='default'
          label='EMAIL ADDRESS'
          maxLength={50}
          onChangeText={(value: string) => {
            formik.handleChange('email')(value);
            setAccountOpeningData({ ...accountOpeningData, email: value });
            validateEmail(value);
          }}
          placeholder='Enter Full Name'
          value={accountOpeningData?.email}
        />
        {formik.touched.email && formik.errors.email && (
          <Text variant={'medium12'} color='error'>
            {formik.errors.email ?? ''}
          </Text>
        )}

        <SimpleInput
          label='Password'
          isPassword
          maxLength={100}
          onChangeText={(value) => {
            formik.handleChange('password')(value);
            setAccountOpeningData({ ...accountOpeningData, password: value });
          }}
          onBlur={formik.handleBlur('password')}
          placeholder='Enter Password'
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
          <Text color='error' variant={'medium12'}>
            {formik.errors.password ?? ''}
          </Text>
        )}
        <SimpleInput
          label='ADDRESS'
          maxLength={100}
          onChangeText={(value: string) => {
            formik.handleChange('residentialAddress')(value);
            setAccountOpeningData({
              ...accountOpeningData,
              residentialAddress: value,
            });
          }}
          value={Capitalize(accountOpeningData?.residentialAddress)}
        />
        {formik.touched.residentialAddress &&
          formik.errors.residentialAddress && (
            <Text variant={'medium12'} color='error'>
              {formik.errors.residentialAddress ?? ''}
            </Text>
          )}
        <CountryCodeSelectButton
          data={newCountryCode}
          inputLabel='PHONE NUMBER'
          inPutMaxLength={11}
          inPutOnChangeText={(value: string) => {
            formik.handleChange('phoneNumber')(value);
            setAccountOpeningData({
              ...accountOpeningData,
              phoneNumber: value,
            });
            validatePhoneNumber(value);
          }}
          inPutValue={accountOpeningData?.phoneNumber}
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
        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
          <Text variant={'medium12'} color='error'>
            {formik.errors.phoneNumber ?? ''}
          </Text>
        )}
        <DatePickerButton
          label='Date of Birth'
          maximumDate={new Date()}
          onChange={(value) => {
            formik.handleChange('DateOfBirth')(value);
            setAccountOpeningData({
              ...accountOpeningData,
              DateOfBirth: value,
            });
          }}
          value={accountOpeningData?.DateOfBirth}
        />
        {formik.touched.DateOfBirth && formik.errors.DateOfBirth && (
          <Text variant={'medium12'} color='error'>
            {formik.errors.DateOfBirth ?? ''}
          </Text>
        )}

        <Box
          flex={1}
          justifyContent='flex-end'
          marginBottom='lg'
          marginTop='lg'
        >
          <NextButton label='Next' onPress={submit} />
        </Box>
        <Box marginBottom='sl'>
          <PreviousButton onPress={() => navigation.goBack()} />
        </Box>
      </KeyBoardAwareScrollBox>
      <ProgressLoader
        color='#FFFFFF'
        hudColor='#000000'
        isHUD
        isModal
        visible={isMutation > 0}
      />
    </LayoutComponent>
  );
};

export default CreateRequestScreen;

const styles = StyleSheet.create({});
