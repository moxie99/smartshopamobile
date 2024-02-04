/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-empty */
/* eslint-disable consistent-return */
/* eslint-disable unicorn/prevent-abbreviations */
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { RFValue } from 'react-native-responsive-fontsize';

import { trash, uploadIcon } from '../../assets/images';
import { Image } from '../Base/index';
import { palette } from '../../constants/theme';
import { showToast } from '../../utils/helpers';

export interface ImagePickerButtonProps {
  value: string | undefined;
  label: string;
  onChange: (argument: any) => void;
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
  image2: {
    height: RFValue(30),
    width: RFValue(30),
  },
  input: {
    fontSize: RFValue(14),
    height: RFValue(40),
    justifyContent: 'center',
    padding: 0,
  },
  line: {
    alignSelf: 'center',
    backgroundColor: '#CFCDD0',
    borderColor: '#CFCDD0',
    borderWidth: 1,
    height: RFValue(4),
    marginTop: RFValue(5),
    width: RFValue(48),
  },
});

const ImagePickerButton = ({
  value,
  label,
  onChange,
}: ImagePickerButtonProps) => {
  const handleLaunchCamera = async () => {
    try {
      await launchCamera(
        {
          includeBase64: true,
          mediaType: 'photo',
          quality: 0.1,
        },
        (res) => {
          if (res.didCancel) {
          }
          if (res.errorCode) {
            return showToast({ message: res.errorCode, type: 'danger' });
          }
          // @ts-ignore
          onChange(res?.assets[0]);
        }
      );
    } catch {}
  };

  const handleLaunchImageLibrary = async () => {
    try {
      await launchImageLibrary(
        {
          includeBase64: true,
          mediaType: 'photo',
          quality: 0.1,
        },
        (res) => {
          if (res.didCancel) {
          }
          if (res.errorCode) {
            return showToast({ message: res.errorCode, type: 'danger' });
          }

          // @ts-ignore
          onChange(res?.assets[0]);
        }
      );
    } catch {}
  };

  const showAlert = () =>
    Alert.alert('Upload image', '', [
      {
        onPress: () => handleLaunchCamera(),
        text: 'Camera',
      },
      { onPress: () => handleLaunchImageLibrary(), text: 'Library' },
      { onPress: () => {}, style: 'cancel', text: 'Cancel' },
    ]);

  return (
    <View style={{ marginVertical: RFValue(8) }}>
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => showAlert()}
        style={[styles.container]}
      >
        {Boolean(value) && (
          <View style={styles.animated}>
            <Text
              style={[
                {
                  color: 'grey',
                  fontSize: RFValue(10),
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
                // fontSize: RFValue(14),
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
          {value ? (
            <TouchableOpacity
              onPress={() => onChange({})}
              style={{
                alignItems: 'center',
                backgroundColor: palette.grey,
                borderRadius: 12,
                height: 24,
                justifyContent: 'center',
                width: 24,
              }}
            >
              <Image
                resizeMode='contain'
                source={trash}
                style={[styles.image]}
              />
            </TouchableOpacity>
          ) : (
            <Image source={uploadIcon} style={[styles.image]} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ImagePickerButton;
