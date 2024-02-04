import Checkbox from 'expo-checkbox';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Box } from '../Base';
import { Text } from '../Typography';
import { palette } from '../../constants/theme';

const styles = StyleSheet.create({
  checkbox: {
    borderColor: palette.primary,
    marginVertical: 8,
  },
  checkboxContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
});

export type CheckBoxButtonProps = {
  isChecked: boolean;
  setChecked: (argument: boolean) => void;
  label: string;
  labelSize?: number;
};

export default function CheckBoxButton({
  isChecked = false,
  setChecked,
  label,
  labelSize,
}: CheckBoxButtonProps) {
  return (
    <Box style={[styles.checkboxContainer]}>
      <Checkbox
        color={isChecked ? palette.primary : undefined}
        onValueChange={setChecked}
        style={styles.checkbox}
        value={isChecked}
      />
      <Text
        color='primary'
        marginTop='xs'
        style={{
          flex: 1,
          fontSize: labelSize,
          paddingLeft: 10,
          textAlign: 'justify',
        }}
        variant='regular14'
      >
        {label}
      </Text>
    </Box>
  );
}
