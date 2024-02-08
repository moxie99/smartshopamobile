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
import {
  deliveryDays,
  minOrderAmount,
  openingTime,
  prepTime,
} from '../utils/constants';
import SelectButton from '../components/Button/SelectButton';
import SimpleInput from '../components/Input/SimpleInput';

export default function DeliveryPreferenceScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const { accountOpeningData, setAccountOpeningData } = useStore(
    (state) => state
  );

  const navigateToPaymentScreen = () => {
    setIsLoading(true);
    navigation.navigate('PaymentAndBillingScreen');
    setIsLoading(false);
  };
  return (
    <LayoutComponent isIcon label='DELIVERY PREFERENCES'>
      <ScrollBox
        backgroundColor='white'
        bounces={false}
        flex={1}
        paddingHorizontal='md'
      >
        <Box marginBottom='sl' marginTop='md'>
          <Box marginTop='lg'>
            <SelectButton
              data={deliveryDays}
              label='DELIVERY DAY 1'
              onChangeText={(value) =>
                setAccountOpeningData({
                  ...accountOpeningData,
                  deliveryDay1: value,
                })
              }
              value={accountOpeningData?.deliveryDay1}
            />
            <SelectButton
              data={['Yes', 'No']}
              label='Do you wish to pick another day with the first picked?'
              onChangeText={(value) =>
                setAccountOpeningData({
                  ...accountOpeningData,
                  wantTopickOtherDays: value,
                })
              }
              value={accountOpeningData?.wantTopickOtherDays}
            />
            {accountOpeningData?.wantTopickOtherDays === 'Yes' && (
              <SelectButton
                data={deliveryDays}
                label='DELIVERY DAY 2'
                onChangeText={(value) =>
                  setAccountOpeningData({
                    ...accountOpeningData,
                    deliveryDay2: value,
                  })
                }
                value={accountOpeningData?.deliveryDay2}
              />
            )}

            <SelectButton
              data={['Yes', 'No']}
              label='CAN YOU DELIVER EVERYDAY?'
              onChangeText={(value) =>
                setAccountOpeningData({
                  ...accountOpeningData,
                  deliverDaily: value,
                })
              }
              value={accountOpeningData?.deliverDaily}
            />
            <SimpleInput
              label='DELIVERY AREA(Zip codes and Neighbourhood etc)'
              maxLength={100}
              onChangeText={(value: string) => {
                setAccountOpeningData({
                  ...accountOpeningData,
                  deliveryArea: value,
                });
              }}
              value={accountOpeningData?.deliveryArea}
            />

            <SimpleInput
              label='PREFERRED DELIVERY PARTNERS(if any)'
              maxLength={100}
              onChangeText={(value: string) => {
                setAccountOpeningData({
                  ...accountOpeningData,
                  preferredDeliveryPartners: value,
                });
              }}
              value={accountOpeningData?.preferredDeliveryPartners}
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
