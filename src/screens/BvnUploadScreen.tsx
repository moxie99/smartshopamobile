/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';
// @ts-ignore
import ProgressLoader from 'rn-progress-loader';

import { successful } from '../assets/lottie';
import { Box, LayoutComponent, ScrollBox } from '../components/Base';
import { NextButton, PreviousButton } from '../components/Button';
import ImagePickerButton from '../components/Button/ImagePickerButton';
import SignatureButton from '../components/Button/SignatureButton';
import { Text } from '../components/Typography';
import { resetNavigation } from '../navigation/ResetNavigator';

import useStore from '../store/useStore';
import { minOrderAmount, openingTime, prepTime } from '../utils/constants';
import SelectButton from '../components/Button/SelectButton';

export default function BvnUploadScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const { accountOpeningData, setAccountOpeningData } = useStore(
    (state) => state
  );

  const navigateToPaymentScreen = () => {
    setIsLoading(true);
    navigation.navigate('OtpVerificationScreen');
    setIsLoading(false);
  };
  return (
    <LayoutComponent isIcon label='MORE DETAILS ABOUT RESTAURANT'>
      <ScrollBox
        backgroundColor='white'
        bounces={false}
        flex={1}
        paddingHorizontal='md'
      >
        <Box marginBottom='sl' marginTop='md'>
          <Box marginTop='lg'>
            <ImagePickerButton
              label='UPLOAD COVER IMAGE'
              onChange={(value) => {
                setAccountOpeningData({
                  ...accountOpeningData,
                  requiredDocuments: {
                    ...accountOpeningData.requiredDocuments,
                    utilityBill: value.base64,
                    utilityBillName: value.fileName,
                  },
                });
              }}
              value={accountOpeningData?.requiredDocuments?.utilityBillName}
            />
            <SelectButton
              data={['Yes', 'No']}
              label='Open in weekends'
              onChangeText={(value) =>
                setAccountOpeningData({
                  ...accountOpeningData,
                  openWeekend: value,
                })
              }
              value={
                accountOpeningData?.openWeekend
                  ? accountOpeningData?.openWeekend
                  : 'No'
              }
            />
            <SelectButton
              data={openingTime}
              label='Opening TIME'
              onChangeText={(value) =>
                setAccountOpeningData({
                  ...accountOpeningData,
                  openingTime: value,
                })
              }
              value={accountOpeningData?.openingTime}
            />
            <SelectButton
              data={openingTime}
              label='CUT OUT TIME(CLOSING TIME)'
              onChangeText={(value) =>
                setAccountOpeningData({
                  ...accountOpeningData,
                  closingTime: value,
                })
              }
              value={accountOpeningData?.closingTime}
            />
            <SelectButton
              data={prepTime}
              label='MEAL READY TIME'
              onChangeText={(value) =>
                setAccountOpeningData({
                  ...accountOpeningData,
                  mealReadyTime: value,
                })
              }
              value={accountOpeningData?.mealReadyTime}
            />
            <SelectButton
              data={prepTime}
              label='PREPARATION TIME'
              onChangeText={(value) =>
                setAccountOpeningData({
                  ...accountOpeningData,
                  prepTime: value,
                })
              }
              value={accountOpeningData?.prepTime}
            />

            <SelectButton
              data={minOrderAmount}
              label='MINIMUM ORDER AMOUNT'
              onChangeText={(value) =>
                setAccountOpeningData({
                  ...accountOpeningData,
                  minOrder: value,
                })
              }
              value={accountOpeningData?.minOrder}
            />
          </Box>
          <Box marginBottom='sl' marginTop='xl'>
            <NextButton label='CONTINUE' onPress={navigateToPaymentScreen} />
          </Box>
          <Box marginBottom='sl'>
            <PreviousButton onPress={navigation.goBack} />
          </Box>
        </Box>
      </ScrollBox>
      <ProgressLoader
        color='#FFFFFF'
        hudColor='#000000'
        isHUD
        isModal
        visible={isLoading}
      />
    </LayoutComponent>
  );
}
