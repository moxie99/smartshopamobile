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
import { countryCode } from '../constants/countryCode';
import CountryCodeSelectButton from '../components/Button/CountryCodeSelectButton';
import navigation from '../navigation';
import { useNavigation } from '@react-navigation/native';
const BusinessNameScreen = () => {
  const navigation = useNavigation();
  const { accountOpeningData, setAccountOpeningData } = useStore(
    (state) => state
  );
  const [searchData, setSearchData] = useState('');
  const newCountryCode = countryCode.filter((item: any) =>
    item?.name?.toLocaleLowerCase().includes(searchData.toLocaleLowerCase())
  );

  console.log(accountOpeningData, '====');

  const navToPersonalDetails = () => {
    navigation.navigate('CreateRequestScreen');
  };

  return (
    <LayoutComponent label='BUSINESS DETAILS' isIcon>
      <KeyBoardAwareScrollBox
        backgroundColor='white'
        bounces={false}
        contentContainerStyle={{ flexGrow: 1 }}
        paddingHorizontal='md'
      >
        <SimpleInput
          keyboardType='default'
          label='BUSINESS NAME'
          onChangeText={(value: string) => {
            setAccountOpeningData({
              ...accountOpeningData,
              businessName: value,
            });
          }}
          placeholder='Enter Product Name'
          value={accountOpeningData?.businessName}
        />
        <SelectButton
          data={['Supermarket', "Farmer's Market", 'Bakery and Bread']}
          label='BUSINESS TYPE'
          onChangeText={(value) =>
            setAccountOpeningData({
              ...accountOpeningData,
              businessType: value,
            })
          }
          value={accountOpeningData?.businessType}
        />

        <SimpleInput
          keyboardType='default'
          label='BUSINESS ADDRESS'
          onChangeText={(value: string) => {
            setAccountOpeningData({
              ...accountOpeningData,
              businessAddress: value,
            });
          }}
          placeholder='Enter Business Address'
          value={accountOpeningData?.businessAddress}
        />
        <CountryCodeSelectButton
          data={newCountryCode}
          inputLabel='BUSINESS PHONE NUMBER'
          inPutMaxLength={11}
          inPutOnChangeText={(value: string) => {
            setAccountOpeningData({
              ...accountOpeningData,
              businessPhoneNumber: value,
            });
          }}
          inPutValue={accountOpeningData?.businessPhoneNumber}
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

        <SimpleInput
          keyboardType='numeric'
          label='BUSINESS WEBSITE (if applicable)'
          onChangeText={(value: string) => {
            accountOpeningData({
              ...accountOpeningData,
              businessWebsite: value,
            });
          }}
          placeholder='Enter Business Website'
          value={accountOpeningData?.businessWebsite}
        />
        <SimpleInput
          keyboardType='default'
          label='SOCIAL MEDIA LINK'
          onChangeText={(value: string) => {
            setAccountOpeningData({
              ...accountOpeningData,
              socialMedLink: value,
            });
          }}
          placeholder='Enter Social Media Link'
          value={accountOpeningData?.socialMedLink}
        />

        <Box marginBottom='sl' marginTop='xl'>
          <Button
            backgroundColor={'primary'}
            label='CONTINUE'
            onPress={navToPersonalDetails}
          />
        </Box>
      </KeyBoardAwareScrollBox>
    </LayoutComponent>
  );
};

export default BusinessNameScreen;
