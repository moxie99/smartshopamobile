import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressLoader from 'rn-progress-loader';
import * as yup from 'yup';

import { login, logo, sibLogo } from '../assets/images';
import { Box, Icon, Image, ImageBackground } from '../components/Base';
import { Button } from '../components/Button';
import { FormInput } from '../components/Input';
import { Text, TextProps } from '../components/Typography';
import { hp } from '../constants/layout';
import { useLogin } from '../hooks/useCreateRequest';

export type FormData = {
  password: string;
  'email or PhoneNumber': string;
};

const schema = yup.object().shape({
  password: yup.string().required(),
  'email or PhoneNumber': yup.string().required(),
});

const styles = StyleSheet.create({
  margin: {
    marginTop: hp(90),
  },
  rotate: { transform: [{ rotate: '180deg' }] },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  text: {
    maxWidth: 200,
  },
});
const labelProps: TextProps = { color: 'blackTint' };

export default function LoginScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { handleSubmit, control } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    navigation.navigate('HomeScreen');
  };

  const createAccount = () => {
    navigation.navigate('CreateRequestScreen');
  };

  return (
    <Box alignItems='center' flex={1} justifyContent='center'>
      <StatusBar style='light' />
      <ImageBackground flex={1} source={login} width='100%'>
        <SafeAreaView edges={['bottom', 'top']} style={styles.safeArea}>
          <Box
            alignItems='center'
            flexDirection='row'
            justifyContent='space-between'
            marginBottom='sl'
            marginTop='md'
          >
            <Pressable onPress={navigation.goBack}>
              {/* <Icon name='caret-right-icon' style={styles.rotate} /> */}
            </Pressable>
            <Image source={logo} />
          </Box>
          <FormInput
            control={control}
            label='Email or Phone Number'
            name='email or PhoneNumber'
          />
          <FormInput control={control} icon label='PASSWORD' name='password' />
          <Text color='white' marginVertical='sl' variant='regular14'>
            {t('For Vendors With Account')}
          </Text>
          <Button
            label={t('LOG IN')}
            labelProps={labelProps}
            marginBottom={'md'}
            onPress={handleSubmit(handleLogin)}
          />
          <Button
            label={t('Create Account')}
            labelProps={labelProps}
            onPress={createAccount}
          />
        </SafeAreaView>
      </ImageBackground>
      <ProgressLoader
        color='#FFFFFF'
        hudColor='#000000'
        isHUD
        isModal
        visible={isLoading}
      />
    </Box>
  );
}
