/* eslint-disable @typescript-eslint/no-shadow */
import moment from 'moment';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { RFValue } from 'react-native-responsive-fontsize';

import { calenderIcon } from '../../assets/images';
import { Image } from '../Base';
export interface DatePickerButtonProps {
  value: string | undefined;
  label: string;
  onChange: (argument: any) => void;
  maximumDate?: Date;
}

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
  image: {
    height: 24,
    width: 24,
  },
  input: {
    fontSize: RFValue(14),
    height: RFValue(40),
    justifyContent: 'center',
    padding: 0,
  },
});

const DatePickerButton = ({
  value,
  label,
  onChange,
  maximumDate,
}: DatePickerButtonProps) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    onChange(moment(date).format('YYYY-MM-DD'));
    // onChange(date.toISOString().split('T')[0])
    hideDatePicker();
  };

  return (
    <View style={{ marginVertical: RFValue(8) }}>
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => showDatePicker()}
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
            top: RFValue(18),
            zIndex: 2,
          }}
        >
          <Image source={calenderIcon} style={[styles.image]} />
        </View>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        maximumDate={maximumDate}
        mode='date'
        onCancel={() => hideDatePicker()}
        onConfirm={(value) => handleConfirm(value)}
      />
    </View>
  );
};

export default DatePickerButton;
