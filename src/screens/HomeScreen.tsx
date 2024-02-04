/* eslint-disable simple-import-sort/imports */
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { logo, logoGreen, sibLogo } from '../assets/images';
import { Box, BoxProps, Icon, Image, ScrollBox } from '../components/Base';
import { Pressable, PressableProps } from '../components/Button';
import { Text, TextProps } from '../components/Typography';
import { hp, wp } from '../constants/layout';
import { resetNavigation } from '../navigation/ResetNavigator';
import useStore from '../store/useStore';
import {
  useGetFailedAccounts,
  useGetPendingAccounts,
  useGetSuccessAccounts,
} from '../hooks/useCreateRequest';

const styles = StyleSheet.create({
  margin: {
    marginTop: hp(90),
  },
  safeArea: {
    flex: 1,
    width: '100%',
  },
  text: {
    maxWidth: 200,
  },
});

const Action = ({
  actionButtonProps,
  actionTitle,
  actionTitleProps,
  heading,
  headingProps,
  title,
  titleProps,
  isLoading,
  ...rest
}: BoxProps & {
  actionButtonProps?: PressableProps;
  actionTitle: string;
  actionTitleProps?: TextProps;
  heading: string;
  headingProps?: TextProps;
  title: string;
  titleProps?: TextProps;
  isLoading?: boolean;
}) => (
  <Box alignItems='center' {...rest}>
    {isLoading ? (
      <ActivityIndicator color='white' size='small' />
    ) : (
      <Text color='white' marginBottom='xs' variant='bold16' {...headingProps}>
        {heading}
      </Text>
    )}
    <Text color='white' marginBottom='md' variant='regular12' {...titleProps}>
      {title}
    </Text>
    <Pressable
      borderRadius={wp(4)}
      paddingHorizontal='md'
      paddingVertical='sml'
      type='scale'
      {...actionButtonProps}
    >
      <Text color='white' variant='medium12' {...actionTitleProps}>
        {actionTitle}
      </Text>
    </Pressable>
  </Box>
);

const Card = ({
  children,
  ...rest
}: BoxProps & { children: React.ReactNode }) => (
  <Box
    alignItems='center'
    borderRadius={wp(10)}
    paddingVertical='md'
    width={wp(163)}
    {...rest}
  >
    {children}
  </Box>
);

export default function IndexScreen() {
  const { setAccountOpeningData, setTierOneSuccess, setUserData, userData } =
    useStore((state) => state);
  const { successAccounts, isLoadingSuccessAccounts, refetchSuccess } =
    useGetSuccessAccounts(userData);
  const { pendingAccounts, isLoadingPendingAccounts, refetchPending } =
    useGetPendingAccounts(userData);
  const { failedAccounts, isLoadingFailedAccounts, refetchFailure } =
    useGetFailedAccounts(userData);
  const navigation = useNavigation();

  const handleCreateRequestPress = () => {
    navigation.navigate('MainRoot');
  };

  const handlePendingPress = () => {
    navigation.navigate('OrderRoot');
  };

  const handleCreatePress = () => {
    navigation.navigate('ProductRoot');
  };

  const handleFailedPress = () => {
    navigation.navigate('PaymentRoot');
  };

  const logout = () =>
    Alert.alert('Logout', 'Do you want to logout?', [
      {
        onPress: () => {},
        style: 'cancel',
        text: 'Cancel',
      },
      {
        onPress: () => {
          setAccountOpeningData({});
          setTierOneSuccess({});
          setUserData({});
          resetNavigation('LoginScreen');
        },
        text: 'Logout',
      },
    ]);

  return (
    <Box alignItems='center' backgroundColor='black' flex={1}>
      <StatusBar style='light' />
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <Box backgroundColor='white' flex={1}>
          <Box
            alignItems='center'
            borderBottomColor='blueb6'
            borderBottomWidth={2}
            flexDirection='row'
            justifyContent='space-between'
            paddingHorizontal='sl'
            paddingVertical='md'
          >
            <Image
              source={logoGreen}
              style={{ height: wp(36), width: wp(30) }}
            />
          </Box>
          <Box paddingHorizontal='md' paddingTop='sl'>
            <Text textTransform='uppercase' variant='medium12'>
              My Dashboard
            </Text>
          </Box>
          <ScrollBox
            paddingHorizontal='md'
            paddingTop='sl'
            refreshControl={
              <RefreshControl
                onRefresh={() => {
                  refetchSuccess();
                  refetchFailure();
                  refetchPending();
                }}
                refreshing={
                  isLoadingSuccessAccounts ||
                  isLoadingFailedAccounts ||
                  isLoadingPendingAccounts
                }
              />
            }
          >
            {/* <Text textTransform='uppercase' variant="medium12">My Dashboard</Text> */}
            <Box
              flexDirection='row'
              justifyContent='space-between'
              marginTop='md'
            >
              <Pressable type='scale'>
                <Card backgroundColor='blueb6'>
                  <MaterialCommunityIcons
                    name='google-analytics'
                    size={24}
                    color='white'
                  />
                  <Action
                    actionButtonProps={{
                      backgroundColor: 'blue',
                      onPress: handleCreateRequestPress,
                    }}
                    actionTitle='VIEW'
                    heading={successAccounts?.content?.length}
                    isLoading={isLoadingSuccessAccounts}
                    title='Others'
                  />
                </Card>
              </Pressable>
              <Pressable type='scale'>
                <Card backgroundColor='success3'>
                  <FontAwesome name='product-hunt' size={24} color='white' />
                  <Action
                    actionButtonProps={{
                      backgroundColor: 'success2',
                      onPress: handleCreatePress,
                    }}
                    actionTitle='VIEW'
                    heading={'7'}
                    isLoading={isLoadingSuccessAccounts}
                    title='Products'
                  />
                </Card>
              </Pressable>
            </Box>
            <Box
              flexDirection='row'
              justifyContent='space-between'
              marginTop='md'
            >
              <Card backgroundColor='purple'>
                <MaterialCommunityIcons
                  name='cart-outline'
                  size={24}
                  color='white'
                />
                <Action
                  actionButtonProps={{
                    backgroundColor: 'purple16',
                    onPress: handlePendingPress,
                  }}
                  actionTitle='VIEW'
                  heading={'8'}
                  isLoading={isLoadingPendingAccounts}
                  title='Orders'
                />
              </Card>
              <Card backgroundColor='burgundy'>
                <MaterialIcons name='payments' size={24} color='white' />
                <Action
                  actionButtonProps={{
                    backgroundColor: 'burgundy16',
                    onPress: handleFailedPress,
                  }}
                  actionTitle='VIEW'
                  heading={'10'}
                  isLoading={isLoadingFailedAccounts}
                  title='Payments'
                />
              </Card>
            </Box>
          </ScrollBox>
          <Box alignItems='flex-end' flex={1} justifyContent='flex-end'>
            <Box mb='lg' padding='md'>
              <Pressable onPress={() => logout()} type='scale'>
                {/* <Icon name='logout-icon' size='xxl' /> */}
              </Pressable>
            </Box>
          </Box>
        </Box>
      </SafeAreaView>
    </Box>
  );
}
