/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';

import { Box, Icon } from '../Base';
import { RenderItemProps, SelectButtonProps } from '../Button/SelectButton';
import { palette } from '../../constants/theme';
import { Capitalize } from '../../utils/helpers';
const styles = StyleSheet.create({
  animated: {
    justifyContent: 'flex-end',
    paddingHorizontal: RFValue(10),
    paddingTop: RFValue(5),
    position: 'absolute',
    zIndex: 2,
  },
  container: {
    backgroundColor: 'white',
    borderColor: '#CFCDD0',
    borderRadius: RFValue(4),
    borderWidth: 1,
    height: RFValue(55),
    paddingHorizontal: RFValue(10),
    position: 'relative',
    width: '100%',
  },
  input: {
    fontSize: RFValue(14),
    height: RFValue(40),
    justifyContent: 'center',
    padding: 0,
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

const RenderItem = ({
  item,
  index,
  handleOnchangeText,
  data,
  value,
}: RenderItemProps) => {
  const isSelected = item.employmentStatus === value;
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => handleOnchangeText(item)}
    >
      <Box
        alignItems='center'
        borderBottomColor='grey'
        borderBottomWidth={data.length - 1 === index ? 0 : 1}
        flexDirection='row'
        justifyContent='space-between'
        px='sm'
        py='md'
      >
        <Box flex={1} style={{ paddingRight: 20 }}>
          <Text>{Capitalize(item?.employmentStatus)}</Text>
        </Box>
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

const SelectButtonEmployment = ({
  label,
  value,
  onChangeText,
  data,
}: SelectButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleOnchangeText = (selectedValue: any) => {
    onChangeText(selectedValue);
    setIsVisible(false);
  };
  return (
    <View style={{ marginVertical: RFValue(8) }}>
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => setIsVisible(true)}
        style={[styles.container]}
      >
        {Boolean(value) && (
          <View style={styles.animated}>
            <Text
              style={[
                {
                  color: 'grey',
                  fontSize: RFValue(10),
                  textTransform: 'uppercase',
                },
              ]}
            >
              {label}
            </Text>
          </View>
        )}
        <View
          style={{
            flex: 1,
            justifyContent: value ? 'flex-end' : 'center',
          }}
        >
          <View
            style={[
              styles.input,
              {
                paddingRight: RFValue(25),
              },
            ]}
          >
            <Text
              numberOfLines={1}
              style={{
                color: value ? 'black' : '#a9a9a9',
                fontSize: RFValue(14),
                textTransform: value ? 'capitalize' : 'uppercase',
              }}
            >
              {value || label}
            </Text>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            right: RFValue(10),
            top: RFValue(20),
            zIndex: 2,
          }}
        >
          <Icon height={12} name='caret-down-icon' size='m' width={12} />
        </View>
      </TouchableOpacity>
      <Modal
        backdropTransitionOutTiming={0}
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        style={{ flex: 1 }}
      >
        <SafeAreaView pointerEvents='box-none' style={{ flex: 1 }}>
          <Box
            alignItems='center'
            flex={1}
            justifyContent='center'
            pointerEvents='box-none'
          >
            <Box backgroundColor='white' borderRadius={8} width='100%'>
              <FlatList
                data={data}
                keyExtractor={(item, index) => item + index}
                // contentContainerStyle={{flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}
                renderItem={({ item, index }) => (
                  <RenderItem
                    data={data}
                    handleOnchangeText={handleOnchangeText}
                    index={index}
                    item={item}
                    value={value}
                  />
                )}
                showsVerticalScrollIndicator={false}
              />
            </Box>
          </Box>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default SelectButtonEmployment;
