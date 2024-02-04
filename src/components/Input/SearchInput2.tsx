import React from 'react';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { AntDesign } from '@expo/vector-icons';
import { Box, Icon } from '../Base';
import { palette } from '../../constants/theme';

export interface SearchInputProps {
  value: string;
  onChangeText: (argument: any) => void;
  placeholder?: string;
}

const SearchInput2 = ({
  value,
  onChangeText,
  placeholder,
}: SearchInputProps) => (
  <Box paddingBottom='sm'>
    <Box
      alignItems='center'
      flexDirection='row'
      style={{
        borderColor: '#CFCDD0',
        borderRadius: RFValue(4),
        borderWidth: 1,
        height: 45,
      }}
    >
      <AntDesign name='search1' size={24} color={palette.primary} />
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={{ flex: 1, height: 45, paddingHorizontal: RFValue(5) }}
        value={value}
      />
    </Box>
  </Box>
);

export default SearchInput2;
