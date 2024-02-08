/* eslint-disable unicorn/no-abusive-eslint-disable */
// eslint-disable-next-line
import React from 'react';
import { ScrollView } from 'react-native';
import Modal from 'react-native-modal';

import Box from './Box';
import ToastMessage from './ToastMessage';
import { Button, Pressable } from '../Button';
import { Text, TextProps } from '../Typography';
import { Ionicons } from '@expo/vector-icons';

const labelProps: TextProps = { variant: 'medium12' };
const secondLabelProps: TextProps = { color: 'fadeBlue', variant: 'medium12' };

const TermsModal = ({
  closeModal,
  isVisible,
  handleAcceptTerms,
  type,
}: {
  closeModal: () => void;
  isVisible: boolean;
  handleAcceptTerms: () => void;
  type?: any;
}) => (
  <Modal isVisible={isVisible} onBackdropPress={closeModal}>
    <ScrollView style={{ marginTop: '10%' }}>
      <ToastMessage />
      <Box
        alignItems='center'
        flex={1}
        justifyContent='center'
        pointerEvents='box-none'
      >
        <Box backgroundColor='white' borderRadius={8} flex={1} width='100%'>
          <Box paddingHorizontal='sl' paddingTop='lg'>
            <Pressable
              alignItems='center'
              backgroundColor='harsh'
              borderRadius={14}
              height={28}
              justifyContent='center'
              marginBottom='lg'
              onPress={closeModal}
              width={28}
            >
              <Ionicons name='close-sharp' size={24} color='black' />
            </Pressable>
          </Box>
          <Box paddingHorizontal='sl' paddingTop='lg'>
            <Text marginBottom='sl' variant='bold14'>
              SmartShopa - Terms and Conditions
            </Text>
            <Text
              style={{ marginBottom: 8, textAlign: 'justify' }}
              variant='regular12'
            >
              1. Introduction Welcome to SmartShopa, operated by Food Mart
              Nigeria Limited. By accessing or using our grocery delivery
              application, you agree to comply with and be bound by these terms
              and conditions.
            </Text>
            <Text
              style={{ marginBottom: 8, textAlign: 'justify' }}
              variant={'regular12'}
            >
              2. Definitions &quot;SmartShopa&quot; refers to the grocery
              delivery application operated by Food Mart Nigeria Limited.
              &quot;User&quot; refers to any individual or entity accessing or
              using the SmartShopa application. &quot;Service&quot; refers to
              the grocery ordering and delivery services provided by SmartShopa.
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify' }}
            >
              3. Acceptance of Terms By accessing or using the SmartShopa
              application, you agree to abide by these terms and conditions. If
              you do not agree with any part of these terms, you may not use our
              services.
            </Text>

            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify' }}
            >
              4. Registration and Account To access certain features of
              SmartShopa, you may be required to register for an account. You
              are responsible for maintaining the confidentiality of your
              account information and agree to accept responsibility for all
              activities that occur under your account.
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify' }}
            >
              5. Services SmartShopa provides a platform for users to browse and
              purchase groceries online for delivery to their location. We
              strive to ensure accurate product listings and timely delivery;
              however, we do not guarantee the availability of any product or
              the accuracy of product information.
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify' }}
            >
              6. Ordering and Delivery Users may place orders for groceries
              through the SmartShopa application. Delivery fees, times, and
              areas covered are subject to change and may vary based on location
              and demand. SmartShopa reserves the right to refuse or cancel any
              order for any reason.
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify' }}
            >
              7. Payments Payment for orders placed through SmartShopa must be
              made using the designated payment methods accepted by the
              application. Users are responsible for providing accurate billing
              and payment information.
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify' }}
            >
              8. User Conduct Users agree to use SmartShopa for lawful purposes
              only and to comply with all applicable laws and regulations.
              Prohibited activities include but are not limited to: fraud,
              harassment, and misuse of the application.
            </Text>

            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify' }}
            >
              9. Intellectual Property All content, trademarks, and other
              intellectual property rights associated with SmartShopa are the
              property of Food Mart Nigeria Limited. Users may not use,
              reproduce, or distribute any content from the application without
              prior written permission.
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify' }}
            >
              10. Privacy Policy SmartShopa collects and uses personal
              information in accordance with our Privacy Policy. By using the
              application, you consent to the collection and use of your
              information as described in the Privacy Policy.
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify' }}
            >
              11. Disclaimer of Warranties SmartShopa is provided on an &quot;as
              is&quot; and &quot;as available&quot; basis without warranties of
              any kind. Food Mart Nigeria Limited makes no representations or
              warranties regarding the accuracy, reliability, or suitability of
              the application.
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify' }}
            >
              12. Indemnification Users agree to indemnify and hold harmless
              Food Mart Nigeria Limited and its affiliates from any claims,
              damages, or losses arising from their use of SmartShopa or
              violation of these terms and conditions.
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify' }}
            >
              13. Governing Law These terms and conditions shall be governed by
              and construed in accordance with the laws of Nigeria. Any disputes
              arising under these terms shall be subject to the exclusive
              jurisdiction of the courts in Nigeria.
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify' }}
            >
              14. Changes to Terms Food Mart Nigeria Limited reserves the right
              to update or modify these terms and conditions at any time. Users
              will be notified of any changes, and continued use of the
              SmartShopa application constitutes acceptance of the revised
              terms.
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify' }}
            >
              15. Contact Information For questions or concerns regarding these
              terms and conditions, please contact Food Mart Nigeria Limited at
              [foodmartng@gmail.com,07042520976].
            </Text>

            <Box paddingHorizontal='sl'>
              <Button
                backgroundColor='classicBlue'
                borderRadius={10}
                label='CLOSE'
                labelProps={labelProps}
                marginBottom='md'
                marginTop='md'
                onPress={closeModal}
                paddingVertical='sm'
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </ScrollView>
  </Modal>
);

export default TermsModal;
