import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import {
  Box,
  KeyBoardAwareScrollBox,
  LayoutComponent,
} from '../components/Base';
import SimpleInput from '../components/Input/SimpleInput';
import { Button } from '../components/Button';
import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';
import LottieView from 'lottie-react-native';
import { successful } from '../assets/lottie';
import { Text } from '../components/Typography';
import { resetNavigation } from '../navigation/ResetNavigator';

const RequestPayment = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const openModal = () => {
    setIsVisible(!isVisible);
  };
  return (
    <LayoutComponent label='Request Payment' isIcon>
      <KeyBoardAwareScrollBox
        backgroundColor='white'
        bounces={false}
        contentContainerStyle={{ flexGrow: 1 }}
        paddingHorizontal='md'
      >
        <SimpleInput label='AMOUNT TO WITHDRAW' isAmount />

        <Box mb={'Ml'} />
        <Button
          backgroundColor={'primary'}
          label='WITHDRAW'
          onPress={openModal}
        />
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
            Please, hold on.
          </Text>
          <Text
            color='black'
            marginBottom='sm'
            textAlign='center'
            variant='regular14'
          >
            Your request has been forwarded.
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
                resetNavigation('PaymentRoot');
              }}
            />
          </Box>
        </Box>
      </Modal>
    </LayoutComponent>
  );
};

export default RequestPayment;

const styles = StyleSheet.create({});
