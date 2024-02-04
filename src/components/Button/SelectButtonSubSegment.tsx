import React, { useState } from 'react';
import { Box, Icon } from '../Base';
import Modal from 'react-native-modal';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { palette } from '../../constants/theme';
import { RFValue } from 'react-native-responsive-fontsize';

export interface SelectButtonSubSegmentProps {
  label: string;
  value: any;
  data: any;
  onChangeText: (arg: any) => void;
  disabled?: boolean;
  searchData?: any;
  setSearchData?: (arg: any) => void;
}

export interface RenderItemProps {
  item: any;
  index: number;
  data: any[];
  value: any;
  handleOnchangeText: (arg: any) => void;
}

const styles = StyleSheet.create({
  radioContainer: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radio: {
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  container: {
    position: 'relative',
    width: '100%',
    borderColor: '#CFCDD0',
    borderWidth: 1,
    borderRadius: RFValue(4),
    height: RFValue(55),
    paddingHorizontal: RFValue(10),
    backgroundColor: 'white',
  },
  itemContainer: {
    paddingBottom: RFValue(20),
    backgroundColor: 'white',
    width: '100%',
    maxHeight: '85%',
    borderTopRightRadius: RFValue(48),
    borderTopLeftRadius: RFValue(48),
    // borderRadius: RFValue(4),
  },
  input: {
    height: RFValue(40),
    fontSize: RFValue(14),
    padding: 0,
    justifyContent: 'center',
  },
  image: {
    width: RFValue(24),
    height: RFValue(24),
  },
  animated: {
    justifyContent: 'flex-end',
    position: 'absolute',
    zIndex: 2,
    paddingHorizontal: RFValue(10),
    paddingTop: RFValue(5),
  },
  image2: {
    width: RFValue(30),
    height: RFValue(30),
  },
  line: {
    marginTop: RFValue(5),
    borderWidth: 1,
    height: RFValue(4),
    borderColor: '#CFCDD0',
    backgroundColor: '#CFCDD0',
    width: RFValue(48),
    alignSelf: 'center',
  },
});

const RenderItem = ({
  item,
  index,
  handleOnchangeText,
  data,
  value,
}: RenderItemProps) => {
  const isSelected = item?.name === value;
  return (
    <TouchableOpacity
      onPress={() => handleOnchangeText(item)}
      activeOpacity={0.75}
    >
      <Box
        flexDirection='row'
        justifyContent='space-between'
        px='sm'
        py='md'
        alignItems='center'
        borderBottomWidth={data.length - 1 === index ? 0 : 1}
        borderBottomColor='grey'
      >
        <Text>{item?.name}</Text>
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

const SelectButtonSubSegment = ({
  label,
  value,
  onChangeText,
  data,
  disabled,
}: SelectButtonSubSegmentProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleOnchangeText = (selectedValue: any) => {
    onChangeText(selectedValue);
    setIsVisible(false);
  };
  return (
    <View style={{ marginVertical: RFValue(8) }}>
      <TouchableOpacity
        disabled={disabled}
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
            justifyContent: Boolean(value) ? 'flex-end' : 'center',
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
                color: Boolean(value) ? 'black' : '#a9a9a9',
                fontSize: RFValue(14),
                textTransform: Boolean(value) ? 'capitalize' : 'uppercase',
              }}
            >
              {Boolean(value) ? value : label}
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
        style={{ flex: 1 }}
        backdropTransitionOutTiming={0}
        onBackdropPress={() => setIsVisible(false)}
        isVisible={isVisible}
      >
        <SafeAreaView pointerEvents='box-none' style={{ flex: 1 }}>
          <Box
            pointerEvents='box-none'
            flex={1}
            alignItems='center'
            justifyContent='center'
          >
            <Box width='100%' backgroundColor='white' borderRadius={8}>
              <FlatList
                data={data}
                // contentContainerStyle={{flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}
                renderItem={({ item, index }) => (
                  <RenderItem
                    item={item}
                    index={index}
                    data={data}
                    value={value}
                    handleOnchangeText={handleOnchangeText}
                  />
                )}
                keyExtractor={(item, index) => item + index}
              />
            </Box>
          </Box>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default SelectButtonSubSegment;
