import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

import { Box, LayoutComponent, ScrollBox } from '../components/Base';
import {
  CheckBoxButton,
  NextButton,
  PreviousButton,
} from '../components/Button';
import DropDownButton from '../components/Button/DropDownButton';
import { Text } from '../components/Typography';
import { SECTIONS } from '../constants/dummyData';

export default function BvnPersonalInfoScreen() {
  const navigation = useNavigation();
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const [isChecked4, setChecked4] = useState(false);
  const [isChecked5, setChecked5] = useState(false);

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
          <Text color='black' marginBottom='lg' variant='regular14'>
            Please confirm the following information
          </Text>
          <DropDownButton sections={SECTIONS} />
          <Text marginTop='xl' variant='medium14'>
            Select the screen that need editing
          </Text>
          <CheckBoxButton
            isChecked={isChecked1}
            label='None'
            setChecked={setChecked1}
          />
          <CheckBoxButton
            isChecked={isChecked2}
            label='Personal and Employment Information'
            setChecked={setChecked2}
          />
          <CheckBoxButton
            isChecked={isChecked3}
            label='Contact Information'
            setChecked={setChecked3}
          />
          <CheckBoxButton
            isChecked={isChecked4}
            label='Service Access Information'
            setChecked={setChecked4}
          />
          <CheckBoxButton
            isChecked={isChecked5}
            label='NOK Information'
            setChecked={setChecked5}
          />

          <Box marginBottom='sl' style={{ marginTop: 50 }}>
            <NextButton
              onPress={() => navigation.navigate('OtpVerificationScreen')}
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
