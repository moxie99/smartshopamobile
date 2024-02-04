/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Box } from '../Base';
import Pressable from '../Button/Pressable';
import { Text } from '../Typography';
import { hp } from '../../constants';
import { palette } from '../../constants/theme';
import { useReSendOTP } from '../../hooks/useCreateRequest';
import { hapticFeedback } from '../../utils';

import useStore from '../../store/useStore';

const styles = StyleSheet.create({
  customPad: {
    alignItems: 'center',
    backgroundColor: palette.lightgray,
    borderRadius: RFValue(25),
    height: RFValue(50),
    justifyContent: 'center',
    width: RFValue(50),
  },
});

export type CustomKeyboardProps = {
  value: string;
  onChangeText: (argument: string) => void;
};

export default function OtpButton({
  value,
  onChangeText,
}: CustomKeyboardProps) {
  const { accountOpeningData } = useStore((state) => state);
  const { handleReSendOTP, error, isLoadingReSendOtp } = useReSendOTP();
  const Ref = useRef(null);
  const [timer, setTimer] = useState('00:00');
  const disabled = timer !== '00:00';

  const getTimeRemaining = (e: Date) => {
    // @ts-ignore
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor(((total / 1000) * 60 * 60) % 24);
    return {
      hours,
      minutes,
      seconds,
      total,
    };
  };

  const startTimer = (e: Date) => {
    const { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        `${minutes > 9 ? minutes : `0${minutes}`}:${
          seconds > 9 ? seconds : `0${seconds}`
        }`
      );
    }
  };
  const clearTimer = (e: Date) => {
    setTimer('00:00');

    if (Ref.current) {
      // @ts-ignore
      clearInterval(Ref.current);
    }
    // @ts-ignore
    Ref.current = setInterval(() => {
      startTimer(e);
    }, 1000);
  };

  const getDeadTime = () => {
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 60);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  const handleClick = (item: any) => {
    if (value?.length < 5) {
      hapticFeedback();
      const returnedValue = [...value, item].join('');
      onChangeText(returnedValue);
    }
  };

  const handleDelete = () => {
    hapticFeedback();
    if (value?.length > 0) {
      const newValue = [...value];
      newValue.pop();
      onChangeText(newValue.join(''));
    }
  };
  return (
    <Box style={{ flex: 1, padding: 20 }}>
      <Box
        style={{
          alignItems: 'center',
          height: hp(40),
          justifyContent: 'center',
        }}
      >
        <Text marginTop='xs' style={{ fontSize: RFValue(20) }} variant='bold16'>
          {value}
        </Text>
      </Box>
      <Text
        color='black'
        marginTop='sm'
        style={{ textAlign: 'center' }}
        variant='regular14'
      >
        Didn't get OTP?
      </Text>
      <TouchableOpacity
        activeOpacity={0.75}
        disabled={disabled}
        onPress={() => {
          handleReSendOTP(accountOpeningData);
          clearTimer(getDeadTime());
        }}
        style={{ padding: 5 }}
      >
        {isLoadingReSendOtp ? (
          <ActivityIndicator color={palette.primary} size='small' />
        ) : (
          <Text
            color={disabled ? 'grey' : 'deepBlue'}
            marginBottom='sm'
            textAlign='center'
            variant='regular14'
          >
            Resend OTP
          </Text>
        )}
      </TouchableOpacity>

      <Box
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: hp(20),
        }}
      >
        <Box
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '33%',
          }}
        >
          <Pressable
            containerStyle={styles.customPad}
            onPress={() => handleClick(1)}
          >
            <Text style={{ fontSize: RFValue(20) }} variant='bold16'>
              1
            </Text>
          </Pressable>
        </Box>
        <Box
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '33%',
          }}
        >
          <Pressable
            containerStyle={styles.customPad}
            onPress={() => handleClick(2)}
          >
            <Text style={{ fontSize: RFValue(20) }} variant='bold16'>
              2
            </Text>
          </Pressable>
        </Box>
        <Box
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '33%',
          }}
        >
          <Pressable
            containerStyle={styles.customPad}
            onPress={() => handleClick(3)}
          >
            <Text style={{ fontSize: RFValue(20) }} variant='bold16'>
              3
            </Text>
          </Pressable>
        </Box>
      </Box>

      <Box
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: hp(20),
        }}
      >
        <Box
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '33%',
          }}
        >
          <Pressable
            containerStyle={styles.customPad}
            onPress={() => handleClick(4)}
          >
            <Text style={{ fontSize: RFValue(20) }} variant='bold16'>
              4
            </Text>
          </Pressable>
        </Box>
        <Box
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '33%',
          }}
        >
          <Pressable
            containerStyle={styles.customPad}
            onPress={() => handleClick(5)}
          >
            <Text style={{ fontSize: RFValue(20) }} variant='bold16'>
              5
            </Text>
          </Pressable>
        </Box>
        <Box
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '33%',
          }}
        >
          <Pressable
            containerStyle={styles.customPad}
            onPress={() => handleClick(6)}
          >
            <Text style={{ fontSize: RFValue(20) }} variant='bold16'>
              6
            </Text>
          </Pressable>
        </Box>
      </Box>

      <Box
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: hp(20),
        }}
      >
        <Box
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '33%',
          }}
        >
          <Pressable
            containerStyle={styles.customPad}
            onPress={() => handleClick(7)}
          >
            <Text style={{ fontSize: RFValue(20) }} variant='bold16'>
              7
            </Text>
          </Pressable>
        </Box>
        <Box
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '33%',
          }}
        >
          <Pressable
            containerStyle={styles.customPad}
            onPress={() => handleClick(8)}
          >
            <Text style={{ fontSize: RFValue(20) }} variant='bold16'>
              8
            </Text>
          </Pressable>
        </Box>
        <Box
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '33%',
          }}
        >
          <Pressable
            containerStyle={styles.customPad}
            onPress={() => handleClick(9)}
          >
            <Text style={{ fontSize: RFValue(20) }} variant='bold16'>
              9
            </Text>
          </Pressable>
        </Box>
      </Box>

      <Box
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: hp(20),
        }}
      >
        <Box
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '33%',
          }}
        />

        <Box
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '33%',
          }}
        >
          <Pressable
            containerStyle={styles.customPad}
            onPress={() => handleClick(0)}
          >
            <Text style={{ fontSize: RFValue(20) }} variant='bold16'>
              0
            </Text>
          </Pressable>
        </Box>
        <Box
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '33%',
          }}
        >
          <Pressable onPress={() => handleDelete()}>
            <Text style={{ fontSize: RFValue(20) }} variant='bold16'>
              Delete
            </Text>
          </Pressable>
        </Box>
      </Box>
    </Box>
  );
}
