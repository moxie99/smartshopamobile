import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { Box, LayoutComponent, ScrollBox } from '../components/Base';
import { NextButton, PreviousButton, RadioButton } from '../components/Button';
import { Text } from '../components/Typography';
import { palette } from '../constants/theme';

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

export default function BvnServiceScreen() {
  const navigation = useNavigation();
  const [isInternetBanking, setIsInternetBanking] = useState(true);
  const [isMobileBanking, setIsMobileBanking] = useState(true);
  const [isEmailAlert, setIsEmailAlert] = useState(true);

  return (
    <LayoutComponent label='BVN CONFIRMATION'>
      <ScrollBox
        backgroundColor='white'
        bounces={false}
        flex={1}
        paddingHorizontal='md'
      >
        <Box marginBottom='sl' marginTop='md'>
          <Text color='black' marginVertical='xs' variant='bold16'>
            BVN Confirmation
          </Text>
          <Text color='black' variant='regular14'>
            Please confirm the following information
          </Text>

          <Text color='black' marginVertical='lg' variant='medium14'>
            To access various services, select the services you wish to add
          </Text>
          <Box style={styles.radioContainer}>
            <RadioButton
              isSelected={isInternetBanking}
              label='Internet Banking *'
              setIsSelected={setIsInternetBanking}
            />
          </Box>
          <Box style={styles.radioContainer}>
            <RadioButton
              isSelected={isMobileBanking}
              label='Mobile Banking *'
              setIsSelected={setIsMobileBanking}
            />
          </Box>
          <Box style={styles.radioContainer}>
            <RadioButton
              isSelected={isEmailAlert}
              label='Email Alert *'
              setIsSelected={setIsEmailAlert}
            />
          </Box>
          <Box
            backgroundColor='lightblue'
            marginBottom='sl'
            marginTop='xl'
            style={styles.face}
          >
            <Text color='blue' marginVertical='sm' variant='regular14'>
              Direct non face-to-face ONB, Direct face
            </Text>
          </Box>
          <Box marginBottom='sl' marginTop='xl'>
            <NextButton
              onPress={() => navigation.navigate('BvnUploadScreen')}
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
