import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { Box, LayoutComponent, ScrollBox } from '../components/Base';
import { NextButton, PreviousButton } from '../components/Button';
import DatePickerButton from '../components/Button/DatePickerButton';
import ImagePickerButton from '../components/Button/ImagePickerButton';
import SelectButton from '../components/Button/SelectButton';
import SimpleInput from '../components/Input/SimpleInput';
import { Text } from '../components/Typography';

import useStore from '../store/useStore';

export default function NextOfKinScreen() {
  const navigation = useNavigation();
  const { accountOpeningData, setAccountOpeningData } = useStore(
    (state) => state
  );

  return (
    <LayoutComponent label='DOCUMENTS UPLOAD'>
      <ScrollBox
        backgroundColor='white'
        bounces={false}
        flex={1}
        paddingHorizontal='md'
      >
        <Box marginBottom='sl' marginTop='md'>
          <Text color='black' marginVertical='xs' variant='bold16'>
            Documents Upload
          </Text>
          <Text color='black' variant='regular14'>
            Upload required documents below
          </Text>

          <Box marginTop='lg'>
            <SelectButton
              data={[
                "Driver's license",
                'International passport',
                'National ID Card - MIMC',
                "Voter's card",
              ]}
              label='IDENTITY TYPE'
              onChangeText={(value) => {
                setAccountOpeningData({
                  ...accountOpeningData,
                  requiredDocuments: {
                    ...accountOpeningData.requiredDocuments,
                    identityType: value,
                  },
                });
              }}
              value={accountOpeningData?.requiredDocuments?.identityType}
            />

            <SimpleInput
              label='ID Number'
              onChangeText={(value: string) =>
                setAccountOpeningData({
                  ...accountOpeningData,
                  idNumber: value,
                })
              }
              value={accountOpeningData?.idNumber}
            />
            <ImagePickerButton
              label='ID IMAGE'
              onChange={(value) => {
                setAccountOpeningData({
                  ...accountOpeningData,
                  requiredDocuments: {
                    ...accountOpeningData.requiredDocuments,
                    idImage: value.base64,
                    idImageName: value.fileName,
                  },
                });
              }}
              value={accountOpeningData?.requiredDocuments?.idImageName}
            />
            <DatePickerButton
              label='ID ISSUE DATE'
              onChange={(value) => {
                setAccountOpeningData({
                  ...accountOpeningData,
                  requiredDocuments: {
                    ...accountOpeningData.requiredDocuments,
                    idIssueDate: value,
                  },
                });
              }}
              value={accountOpeningData?.requiredDocuments?.idIssueDate}
            />
            <DatePickerButton
              label='ID EXPIRY DATE'
              onChange={(value) => {
                setAccountOpeningData({
                  ...accountOpeningData,
                  requiredDocuments: {
                    ...accountOpeningData.requiredDocuments,
                    idExpiryDate: value,
                  },
                });
              }}
              value={accountOpeningData?.requiredDocuments?.idExpiryDate}
            />
            <ImagePickerButton
              label='PASSPORT PHOTOGRAPH'
              onChange={(value) => {
                setAccountOpeningData({
                  ...accountOpeningData,
                  requiredDocuments: {
                    ...accountOpeningData.requiredDocuments,
                    passportPhotograph: value.base64,
                    passportPhotographName: value.fileName,
                  },
                });
              }}
              value={
                accountOpeningData?.requiredDocuments?.passportPhotographName
              }
            />
            <ImagePickerButton
              label='SIGNATURE'
              onChange={(value) => {
                setAccountOpeningData({
                  ...accountOpeningData,
                  requiredDocuments: {
                    ...accountOpeningData.requiredDocuments,
                    signature: value.base64,
                    signatureName: value.fileName,
                  },
                });
              }}
              value={accountOpeningData?.requiredDocuments?.signatureName}
            />

            <ImagePickerButton
              label='UTILITY BILL'
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
          </Box>
          <Box marginBottom='sl' marginTop='xl'>
            <NextButton
              onPress={() => navigation.navigate('BvnPersonalInfoScreen')}
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
