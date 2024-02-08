import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Box, LayoutComponent, ScrollBox } from '../components/Base';
import {
  Button,
  CheckBoxButton,
  NextButton,
  PreviousButton,
} from '../components/Button';
import { Text } from '../components/Typography';
import Modal from 'react-native-modal';
import useStore from '../store/useStore';
import { TouchableOpacity } from 'react-native';
import { showToast } from '../utils/helpers';
import TermsModal from '../components/Base/TermsModal';
import { RFValue } from 'react-native-responsive-fontsize';
import LottieView from 'lottie-react-native';
import { successful } from '../assets/lottie';
import { resetNavigation } from '../navigation/ResetNavigator';

export default function BvnPersonalInfoScreen() {
  const [isTerms, setTerms] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation();
  const { accountOpeningData, setAccountOpeningData } = useStore(
    (state) => state
  );

  const handleCloseTerms = () => {
    setTerms(false);
  };
  const handleAcceptTerms = () => {
    setAccountOpeningData({ ...accountOpeningData, acceptTerms: true });
  };

  const openModal = () => {
    setIsVisible(!isVisible);
  };

  return (
    <LayoutComponent label='TERMS AND AGREEMENT'>
      <ScrollBox
        backgroundColor='white'
        bounces={false}
        flex={1}
        paddingHorizontal='md'
      >
        <Box marginBottom='sl' marginTop='md'>
          <Text color='black' marginVertical='lg' variant='regular14'>
            Kindly confirm the details you have filled are correct and you want
            to share them with Smartshopa
          </Text>

          <CheckBoxButton
            isChecked={isChecked}
            label='By ticking this box you hereby confirm that you have read & accept the Terms and Conditions and consent to the processing of your information by a Third Party'
            labelSize={12}
            setChecked={(value) => {
              setIsChecked(value);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setTerms(true);
            }}
            style={{ marginTop: 20 }}
          >
            <Text
              color='primary'
              fontWeight='bold'
              textDecorationLine='underline'
              variant='regular14'
            >
              Terms and Conditions
            </Text>
          </TouchableOpacity>
          <TermsModal
            closeModal={handleCloseTerms}
            handleAcceptTerms={handleAcceptTerms}
            isVisible={isTerms}
          />

          <Box marginBottom='sl' style={{ marginTop: 50 }}>
            <NextButton onPress={openModal} />
          </Box>

          <Box marginBottom='sl'>
            <PreviousButton onPress={navigation.goBack} />
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
            textAlign={'justify'}
            variant='regular12'
          >
            Congratulations, you have successfully created a vendor account with
            Smartshopa. Our team will review your application and reach out to
            you via mail or phone call within the next 3 days. Your account is
            currently inactive and you will only have access to the account
            section on the dashboard. You can also reach out to our team if you
            have any question.
          </Text>
          <Box
            marginBottom='xxl'
            marginTop='sm'
            style={{ width: RFValue(100) }}
          >
            <Button
              backgroundColor={'error'}
              label='CONTINUE'
              onPress={() => {
                setIsVisible(false);
                resetNavigation('HomeScreen');
              }}
            />
          </Box>
        </Box>
      </Modal>
    </LayoutComponent>
  );
}
