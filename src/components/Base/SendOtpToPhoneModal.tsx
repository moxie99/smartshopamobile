import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

import Box from './Box';
import ToastMessage from './ToastMessage';
import { Text } from '../Typography';
import { palette } from '../../constants/theme';
import { useSendOTP } from '../../hooks/useCreateRequest';
import { showToast } from '../../utils/helpers';

export interface SendOtpToPhoneModalProps {
  value: any;
  data: any[] | undefined;
  onChangeText: (argument: any) => void;
  isVisible: boolean;
  handleSetIsVisible: () => void;
  accountOpeningData: object;
  setAccountOpeningData: (argument: any) => void;
}

export interface RenderItemProps {
  item: any;
  index: number;
  data: any[] | undefined;
  value: any;
  handleOnchangeText: (argument: any) => void;
  accountOpeningData: any;
}

const styles = StyleSheet.create({
  otpButton: {
    alignItems: 'center',
    backgroundColor: palette.deepBlue,
    borderRadius: 8,
    height: 45,
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  radio: {
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  radioContainer: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    height: 16,
    justifyContent: 'center',
    width: 16,
  },
});

const RenderItem = ({ item, handleOnchangeText, value }: RenderItemProps) => {
  const isSelected = item === value;
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => handleOnchangeText(item)}
    >
      <Box
        alignItems='center'
        borderBottomColor='grey'
        borderBottomWidth={1}
        flexDirection='row'
        justifyContent='space-between'
        px='sm'
        py='md'
      >
        <Text variant='regular14'>{`****${item.slice(
          Math.max(0, item.length - 4)
        )}`}</Text>
        <RadioButton isSelected={isSelected} />
      </Box>
    </TouchableOpacity>
  );
};

const RadioButton = ({ isSelected }: { isSelected: boolean }) => (
  <View
    style={[
      styles.radioContainer,
      { borderColor: isSelected ? palette.classicBlue : 'grey' },
    ]}
  >
    <View
      style={[
        styles.radio,
        { backgroundColor: isSelected ? palette.classicBlue : 'white' },
      ]}
    />
  </View>
);

const SendOtpToPhoneModal = ({
  isVisible,
  handleSetIsVisible,
  value,
  onChangeText,
  data,
  accountOpeningData,
  setAccountOpeningData,
}: SendOtpToPhoneModalProps) => {
  const { handleSendOTP, isLoadingSendOtp, handleSentOTPTOUsers } =
    useSendOTP();
  const handleOnchangeText = (selectedValue: any) => {
    onChangeText(selectedValue);
    // handleSetIsVisible();
  };
  return (
    <Modal
      backdropTransitionOutTiming={0}
      isVisible={isVisible}
      // onBackdropPress={() => handleSetIsVisible()}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ToastMessage />
        <Box
          alignItems='center'
          flex={1}
          justifyContent='center'
          pointerEvents='box-none'
        >
          <Box backgroundColor='white' borderRadius={8} width='100%'>
            <FlatList
              data={data}
              keyExtractor={(item) => item}
              // contentContainerStyle={{flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}
              ListFooterComponent={() => (
                <Box
                  alignItems='center'
                  flexDirection='row'
                  justifyContent='space-between'
                  padding='md'
                >
                  <Box style={{ width: '45%' }}>
                    <TouchableOpacity
                      disabled={isLoadingSendOtp}
                      onPress={() => {
                        if (!value) {
                          return showToast({
                            message: 'Select number to send otp',
                            type: 'success',
                          });
                        }
                        handleSendOTP({
                          ...accountOpeningData,
                          phoneToSendOtp: value,
                        });
                        handleSentOTPTOUsers(accountOpeningData);
                      }}
                      style={styles.otpButton}
                    >
                      {isLoadingSendOtp ? (
                        <ActivityIndicator color='white' />
                      ) : (
                        <Text color='white' variant='bold14'>
                          Send OTP
                        </Text>
                      )}
                    </TouchableOpacity>
                  </Box>
                  <Box style={{ width: '45%' }}>
                    <TouchableOpacity
                      onPress={() => handleSetIsVisible()}
                      style={[styles.otpButton, { backgroundColor: 'red' }]}
                    >
                      <Text color='white' variant='bold14'>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </Box>
                </Box>
              )}
              ListHeaderComponent={() => (
                <Box
                  borderBottomColor='grey'
                  borderBottomWidth={1}
                  paddingHorizontal='sm'
                  paddingVertical='md'
                >
                  <Text lineHeight={20} variant='medium16'>
                    Select number to receive OTP
                  </Text>
                </Box>
              )}
              renderItem={({ item, index }) => (
                <RenderItem
                  handleOnchangeText={handleOnchangeText}
                  item={item}
                  value={value}
                />
              )}
            />
          </Box>
        </Box>
      </SafeAreaView>
    </Modal>
  );
};

export default SendOtpToPhoneModal;
