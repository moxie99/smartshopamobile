import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { Box, LayoutComponent, ScrollBox } from '../components/Base';
import { NextButton, PreviousButton, RadioButton } from '../components/Button';
import { Text } from '../components/Typography';
import { palette } from '../constants/theme';
import useStore from '../store/useStore';
import SimpleInput from '../components/Input/SimpleInput';
import ImagePickerButton from '../components/Button/ImagePickerButton';

const styles = StyleSheet.create({
  face: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  radioContainer: {
    backgroundColor: palette.lightgray,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default function CompDocScreen() {
  const navigation = useNavigation();
  const { accountOpeningData, setAccountOpeningData } = useStore(
    (state) => state
  );

  return (
    <LayoutComponent label='COMPLIANCE AND DOCUMENTATION'>
      <ScrollBox
        backgroundColor='white'
        bounces={false}
        flex={1}
        paddingHorizontal='md'
      >
        <Box marginBottom='sl' marginTop='md'>
          <SimpleInput
            keyboardType='numeric'
            label='BUSINESS LICENSE OR PERMIT NUMBER'
            onChangeText={(value: string) =>
              setAccountOpeningData({
                ...accountOpeningData,
                busLicOrPerNumber: value,
              })
            }
            placeholder='Enter Business License or Permit Number'
            value={accountOpeningData?.busLicOrPerNumber}
          />

          <ImagePickerButton
            label='UPLOAD HEALTH AND SAFETY CERTIFICATIONS(if selling perishable goods)'
            onChange={(value) => {
              setAccountOpeningData({
                ...accountOpeningData,
                productImg: value.base64,
                productImgName: value.fileName,
              });
            }}
            value={accountOpeningData?.productImg}
          />

          <SimpleInput
            keyboardType='numeric'
            label='ADD ANY ADDITIONAL REGULATORY AND COMPLIANCE DETAILS'
            onChangeText={(value: string) =>
              setAccountOpeningData({
                ...accountOpeningData,
                regulatoryDetails: value,
              })
            }
            placeholder='Please Add Any Additional Regulatory Details'
            value={accountOpeningData?.regulatoryDetails}
          />

          <Box marginBottom='sl' marginTop='xl'>
            <NextButton
              onPress={() => navigation.navigate('TermsAndAgreementScreen')}
            />
          </Box>
          <Box marginBottom='sl'>
            <PreviousButton onPress={navigation.goBack} />
          </Box>
        </Box>
      </ScrollBox>
    </LayoutComponent>
  );
}
