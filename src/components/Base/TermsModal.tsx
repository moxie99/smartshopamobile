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
              Terms and Conditions for FoodMart
            </Text>
            <Text
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
              variant='bold14'
            >
              1. Introduction
            </Text>
            <Text
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
              variant={'regular12'}
            >
              1.1 Welcome to FoodMart ("the App"). By using the App, you agree
              to comply with and be bound by these terms and conditions.
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              1.2 The App is owned and operated by FoodMart Nig Ltd, registered
              at 1 Rabitu Aghedo Street, Ago Palace Way, Lagos, Nigeria.
            </Text>

            <Text
              variant='bold14'
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              2. Vendor Registration and Responsibilities
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              2.1 Vendors must register with FoodMart to display their food
              menus.
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              2.2 Vendors are responsible for providing accurate and up-to-date
              information about their business, including menu items, prices,
              and availability.
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              2.3 Vendors must adhere to all applicable laws and regulations
              related to food safety and hygiene.
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              2.4 Vendors are required to maintain the confidentiality and
              security of their login credentials.
            </Text>

            <Text
              variant='bold14'
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              3. Menu Display and Content
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              3.1 FoodMart reserves the right to review and approve all menu
              items and content before they are displayed on the platform.
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              3.2 Vendors are responsible for ensuring that their menu items
              comply with all relevant laws and regulations.
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              3.3 FoodMart may suggest edits or improvements to enhance the
              presentation of menu items.
            </Text>
            <Text
              variant='bold14'
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              4. Ordering Process
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              4.1 Users can place orders through FoodMart.
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              4.2 Vendors are responsible for accepting and fulfilling orders
              promptly.
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              4.3 Vendors must notify FoodMart of any changes to their menu,
              pricing, or availability promptly.
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              4.4 In the event a vendor is unable to fulfill an order, they must
              inform FoodMart and the customer immediately.
            </Text>

            <Text
              variant='bold14'
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              5. Payments and Fees
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              5.1 FoodMart may charge vendors a commission fee for each
              transaction processed through the platform.
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              5.2 Payment processing and financial transactions will be handled
              securely through [Payment Gateway].
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              5.3 Vendors will receive payments from FoodMart, minus the
              agreed-upon commission, within a specified payment period.
            </Text>
            <Text
              variant='bold14'
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              6. Delivery and Fulfillment
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              6.1 Vendors are responsible for timely delivery and ensuring the
              quality of the food.
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              6.2 FoodMart may provide a delivery service or collaborate with
              third-party delivery services.
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              6.3 Vendors are responsible for packaging food securely to
              maintain quality during transportation.
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              6.4 FoodMart reserves the right to set delivery radius limits for
              vendors.
            </Text>

            <Text
              variant='bold14'
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              7. Reviews and Ratings
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              7.1 Users can leave reviews and ratings for vendors.
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              7.2 Vendors may respond to reviews, but FoodMart reserves the
              right to moderate and remove inappropriate content.
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              7.3 FoodMart may use positive reviews for promotional purposes.
            </Text>

            <Text
              variant='bold14'
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              8. Intellectual Property
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              8.1 Vendors retain the intellectual property rights to their menu
              items and content.
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              8.2 FoodMart has the right to use vendor information and content
              for marketing and promotional purposes.
            </Text>

            <Text
              variant='bold14'
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              9. Termination
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              9.1 FoodMart reserves the right to terminate the agreement with
              vendors for violation of these terms or for any other reason.
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              9.2 Vendors may terminate their participation by providing written
              notice to FoodMart.
            </Text>

            <Text
              variant='bold14'
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              10. Confidentiality
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              10.1 Both parties agree to keep any non-public information
              obtained during the course of their engagement confidential.
            </Text>

            <Text
              variant='bold14'
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              11. Force Majeure
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              11.1 Neither party shall be liable for any failure or delay in
              performance caused by circumstances beyond their reasonable
              control.
            </Text>

            <Text
              variant='bold14'
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              12. Dispute Resolution
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              12.1 Any disputes arising out of or in connection with this
              agreement shall be resolved through arbitration in accordance with
              the rules of [Arbitration Organization].
            </Text>

            <Text
              variant='bold14'
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              13. Governing Law
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              13.1 This agreement shall be governed by and construed in
              accordance with the laws of [Jurisdiction].
            </Text>

            <Text
              variant='bold14'
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              14. Miscellaneous
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              14.1 These terms may be updated from time to time, and vendors
              will be notified of any changes.
            </Text>
            <Text
              variant={'regular12'}
              style={{ marginBottom: 8, textAlign: 'justify', fontSize: 14 }}
            >
              14.2 Vendors are responsible for regularly reviewing the terms and
              conditions.
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
