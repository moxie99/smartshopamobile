/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { Capitalize } from '../../utils/helpers';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',

    borderRadius: 8,

    justifyContent: 'center',

    padding: 20,
    // height: 70,
    width: '80%',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
const toastConfig = {
  error: ({ text1, text2 }: { text1: string; text2: string }) => (
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize: 16 }]}>{text1}</Text>
      <Text style={[styles.text]}>{Capitalize(text2)}</Text>
    </View>
  ),

  success: ({ text1, text2 }: { text1: string; text2: string }) => (
    <View style={[styles.container, { backgroundColor: 'green' }]}>
      <Text style={[styles.text, { fontSize: 16 }]}>{text1}</Text>
      <Text style={styles.text}>{text2}</Text>
    </View>
  ),
};

// @ts-ignore
const ToastMessage = () => <Toast config={toastConfig} />;

export default ToastMessage;
