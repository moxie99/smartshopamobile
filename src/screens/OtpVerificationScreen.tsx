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

export default function OtpVerificationScreen() {
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const [isVisible, setIsVisble] = useState(false);
  const { accountOpeningData, setAccountOpeningData } = useStore(
    (state) => state
  );

  const makeModalVisible = () => {
    setIsVisble(!isVisible);
  };
  return (
    <LayoutComponent label='PAYMENT INFORMATION' isIcon>
      <ScrollBox
        backgroundColor='white'
        bounces={false}
        flex={1}
        paddingHorizontal='md'
      >
        <Box marginBottom='sl' marginTop='md'>
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
            placeholder='Enter BAK ACCOUNT NAME'
            value={accountOpeningData?.acctName}
          />
          <SimpleInput
            keyboardType='default'
            label='BANK NAME'
            onChangeText={(value: string) =>
              setAccountOpeningData({ ...accountOpeningData, bankName: value })
            }
            placeholder='Enter BVN'
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
            label='NOTIFICATION PAGE'
            maxLength={100}
            onChangeText={(value: string) =>
              setAccountOpeningData({ ...accountOpeningData, notifPage: value })
            }
            placeholder='Enter BVN'
            value={accountOpeningData?.notifPage}
          />
          <SimpleInput
            keyboardType='default'
            label='SIGN OUT PAGE'
            maxLength={100}
            onChangeText={(value: string) =>
              setAccountOpeningData({
                ...accountOpeningData,
                signOutPage: value,
              })
            }
            placeholder='Enter BVN'
            value={accountOpeningData?.signOutPage}
          />

          <Box marginBottom='sl' style={{ marginTop: 50 }}>
            <NextButton
              label='SUBMIT FOR VERIFICATION'
              onPress={makeModalVisible}
            />
          </Box>
        </Box>
      </ScrollBox>
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
            Congratulations, your account has been submitted for review, you
            will get an email from us, once the verification process is
            complete. In the mean time, you can log in and chat eith the support
            team.
          </Text>
          <Box
            marginBottom='xxl'
            marginTop='sm'
            style={{ width: RFValue(100) }}
          >
            <NextButton
              label='Done'
              onPress={() => {
                setAccountOpeningData({});
                resetNavigation('HomeScreen');
              }}
            />
          </Box>
        </Box>
      </Modal>
    </LayoutComponent>
  );
}
