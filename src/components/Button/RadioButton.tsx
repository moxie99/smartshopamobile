import { StyleSheet } from 'react-native';
import { Box } from '../Base';
import { Text } from '../Typography';

import Pressable, { PressableProps } from './Pressable';

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    borderColor: '#0F7AF8',
    borderRadius: 12,
    borderWidth: 2,
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
  buttonDot: {
    backgroundColor: '#0F7AF8',
    borderRadius: 6,
    height: 12,
    width: 12,
  },

  containerWrap: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export type RadioButtonProps = PressableProps & {
  label?: string;
  isSelected: boolean;
  setIsSelected: (argument: boolean) => void;
};

export default function RadioButton({
  label,
  isSelected = true,
  setIsSelected,
}: RadioButtonProps) {
  return (
    <Box>
      {label && (
        <Text color='black' marginVertical='sm' variant='medium14'>
          {label}
        </Text>
      )}
      <Box style={[styles.containerWrap]}>
        <Pressable
          containerStyle={[styles.buttonContainer]}
          onPress={() => setIsSelected(true)}
        >
          <Box style={isSelected ? styles.buttonDot : {}} />
        </Pressable>
        <Text
          color='black'
          marginVertical='sm'
          style={{ marginLeft: 10 }}
          variant='regular14'
        >
          Yes
        </Text>
      </Box>
      <Box style={[styles.containerWrap, { marginTop: 10 }]}>
        <Pressable
          containerStyle={[styles.buttonContainer]}
          onPress={() => setIsSelected(false)}
        >
          <Box style={!isSelected ? styles.buttonDot : {}} />
        </Pressable>
        <Text
          color='black'
          marginVertical='sm'
          style={{ marginLeft: 10 }}
          variant='regular14'
        >
          No
        </Text>
      </Box>
    </Box>
  );
}
