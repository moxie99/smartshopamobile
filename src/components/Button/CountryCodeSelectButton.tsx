import React, { useState } from 'react';
import { Pressable } from '../Button/index';
import { Box, ScrollBox } from '../Base';
import Modal from 'react-native-modal';
import { FontAwesome } from '@expo/vector-icons';
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
import SimpleInput from '../Input/SimpleInput';
import SearchInput from '../Input/SearchInput';

export interface CountryCodeSelectButtonProps {
  label: string;
  value: any;
  data: any[];
  onChangeText: (arg: any) => void;
  inputLabel?: string;
  keyboardType?: string;
  inPutMaxLength?: number;
  inPutValue: string | undefined;
  inPutOnChangeText: (arg: any) => void;
  setSearchData?: (arg: any) => void;
  searchData: any;
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
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
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
  const isSelected = data.findIndex((x) => x.dial_code === value) === index;
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
        <Text style={{ flex: 1 }}>
          {item?.name} {item?.dial_code}
        </Text>
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

const CountryCodeSelectButton = ({
  label,
  value,
  onChangeText,
  data,
  inputLabel,
  inPutOnChangeText,
  inPutValue,
  inPutMaxLength,
  keyboardType,
  setSearchData,
  searchData,
}: CountryCodeSelectButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleOnchangeText = (selectedValue: any) => {
    onChangeText(selectedValue);
    if (setSearchData) {
      setSearchData('');
    }
    setIsVisible(false);
  };
  return (
    <View style={{ marginVertical: RFValue(8) }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: RFValue(90) }}>
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
              <FontAwesome name='caret-up' size={24} color='black' />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <SimpleInput
            wrapperStyle={{ marginVertical: 0 }}
            containerStyle={{
              borderLeftWidth: 0,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            label={inputLabel}
            keyboardType={keyboardType}
            maxLength={inPutMaxLength}
            value={inPutValue}
            onChangeText={inPutOnChangeText}
          />
        </View>
      </View>

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
            <Box width='100%' backgroundColor='white' borderRadius={8} flex={1}>
              <SearchInput
                placeholder='Search by country name...'
                onChangeText={(value) =>
                  setSearchData ? setSearchData(value) : {}
                }
                value={searchData}
              />

              <FlatList
                keyboardShouldPersistTaps={'handled'}
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

export default CountryCodeSelectButton;
