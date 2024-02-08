import React, { useState } from 'react';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import { checkIcon } from '../assets/images';
import { Box, Image, LayoutComponent, ScrollBox } from '../components/Base';
import { NextButton, OtpButton, PreviousButton } from '../components/Button';
import { RFValue } from 'react-native-responsive-fontsize';
import { Text } from '../components/Typography';
import SimpleInput from '../components/Input/SimpleInput';
import useStore from '../store/useStore';
import navigation from '../navigation';
import { useNavigation } from '@react-navigation/native';
import { successful } from '../assets/lottie';
import { resetNavigation } from '../navigation/ResetNavigator';
import SelectButton from '../components/Button/SelectButton';
import { paymentfrequency } from '../utils/constants';

export default function PaymentAndBillingScreen() {
  const navigation = useNavigation();
  const { accountOpeningData, setAccountOpeningData } = useStore(
    (state) => state
  );

  const navToCompAndDocScreen = () => {
    navigation.navigate('CompDocScreen');
  };
  return (
    <LayoutComponent label='PAYMENT AND BILLING' isIcon>
      <ScrollBox
        backgroundColor='white'
        bounces={false}
        flex={1}
        paddingHorizontal='md'
      >
        <Box marginBottom='sl' marginTop='md'>
          <SelectButton
            data={paymentfrequency}
            label='PAYMENT TERMS'
            onChangeText={(value) =>
              setAccountOpeningData({
                ...accountOpeningData,
                paymentTerms: value,
              })
            }
            value={accountOpeningData?.paymentTerms}
          />
          <SimpleInput
            keyboardType='numeric'
            label='BANK ACCOUNT NUMBER'
            maxLength={10}
            onChangeText={(value: string) =>
              setAccountOpeningData({ ...accountOpeningData, acctNum: value })
            }
            placeholder='Enter BANK ACCOUNT NUMBER'
            value={accountOpeningData?.acctNum}
          />
          <SimpleInput
            keyboardType='default'
            label='BANK ACCOUNT NAME'
            onChangeText={(value: string) =>
              setAccountOpeningData({ ...accountOpeningData, acctName: value })
            }
            placeholder='Enter BANK ACCOUNT NAME'
            value={accountOpeningData?.acctName}
          />
          <SimpleInput
            keyboardType='default'
            label='BANK NAME'
            onChangeText={(value: string) =>
              setAccountOpeningData({ ...accountOpeningData, bankName: value })
            }
            placeholder='Enter BANK NAME'
            value={accountOpeningData?.bankName}
          />
          <SimpleInput
            keyboardType='numeric'
            label='BVN(Optional)'
            maxLength={11}
            onChangeText={(value: string) =>
              setAccountOpeningData({ ...accountOpeningData, bvn: value })
            }
            placeholder='Enter BVN'
            value={accountOpeningData?.bvn}
          />

          <SimpleInput
            keyboardType='default'
            label='BILLING CONTRACT INFORMATION'
            onChangeText={(value: string) =>
              setAccountOpeningData({
                ...accountOpeningData,
                billContInfo: value,
              })
            }
            placeholder='Enter Additional Information'
            value={accountOpeningData?.billContInfo}
          />
          <SimpleInput
            keyboardType='numeric'
            label='TAX IDENTIFICATION NUMBER'
            maxLength={9}
            onChangeText={(value: string) =>
              setAccountOpeningData({
                ...accountOpeningData,
                tin: value,
              })
            }
            placeholder='Enter Tax Identification Number'
            value={accountOpeningData?.tin}
          />

          <Box marginBottom='sl' style={{ marginTop: 50 }}>
            <NextButton
              label='SUBMIT FOR VERIFICATION'
              onPress={navToCompAndDocScreen}
            />
          </Box>
        </Box>
      </ScrollBox>
    </LayoutComponent>
  );
}
