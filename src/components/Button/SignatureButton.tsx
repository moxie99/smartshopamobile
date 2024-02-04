import React, { createRef, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';
import SignatureCapture from 'react-native-signature-capture';

import { signatureIcon, trash } from '../../assets/images';
import { Box, Icon, Image } from '../Base';
import ToastMessage from '../Base/ToastMessage';
import Pressable from './Pressable';
import { palette } from '../../constants/theme';
import { showToast } from '../../utils/helpers';

export interface SignatureButtonProps {
  label: string;
  value: any;
  onChangeText: (argument: any) => void;
  disabled?: boolean;
  searchData?: any;
  setSearchData?: (argument: any) => void;
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
  containerStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#0033AA',
    borderColor: '#0033AA',
    borderRadius: 10,
    borderWidth: 1,
    height: RFValue(45),
    justifyContent: 'center',
    width: '100%',
  },
  image: {
    height: RFValue(24),
    width: RFValue(24),
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
  itemContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: RFValue(48),
    borderTopRightRadius: RFValue(48),
    maxHeight: '85%',
    paddingBottom: RFValue(20),
    width: '100%',
    // borderRadius: RFValue(4),
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

const SignatureButton = ({
  label,
  value,
  onChangeText,
  disabled,
}: SignatureButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const sign = createRef();

  // Add a state to track the current action (sign on app or take picture)
  const [currentAction, setCurrentAction] = useState<'sign' | 'picture'>(
    'sign'
  );

  const saveSign = () => {
    // @ts-ignore
    sign.current.saveImage();
  };

  const resetSign = () => {
    // @ts-ignore
    sign.current.resetImage();
  };

  const _onSaveEvent = (result: any) => {
    if (!result) {
      return showToast({ message: 'Sign on the app to save', type: 'info' });
    }
    handleOnchangeText(result);
  };

  const _onDragEvent = () => {
    // This callback will be called when the user enters signature
  };

  const handleOnchangeText = (selectedValue: any) => {
    onChangeText(selectedValue);
    setIsVisible(false);
  };

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
            return showToast({
              message: 'User cancelled',
              type: 'info',
            });
          }
          if (res.errorCode) {
            return showToast({ message: res.errorCode, type: 'danger' });
          }
          onChangeText({
            encoded: res?.assets ? res.assets[0]?.base64 : '',
            pathName: res?.assets ? res.assets[0]?.fileName : '',
          });
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
            return showToast({
              message: 'User cancelled',
              type: 'info',
            });
          }
          if (res.errorCode) {
            return showToast({ message: res.errorCode, type: 'danger' });
          }
          onChangeText({
            encoded: res?.assets ? res.assets[0]?.base64 : '',
            pathName: res?.assets ? res.assets[0]?.fileName : '',
          });
        }
      );
    } catch {}
  };

  const onClick = () => {
    // Show a modal to allow the user to choose between signing on the app or taking a picture
    Alert.alert('Select option', '', [
      {
        onPress: () => {},
        style: 'cancel',
        text: 'Cancel',
      },
      {
        onPress: () => {
          setCurrentAction('picture'); // Set the current action to take a picture
          handleLaunchCamera(); // Launch the camera
        },
        text: 'Take Picture',
      },
      {
        onPress: () => {
          setCurrentAction('sign'); // Set the current action to sign on the app
          setIsVisible(true); // Show the signature capture modal
        },
        text: 'Sign on App',
      },
    ]);
  };

  return (
    <View style={{ marginVertical: RFValue(8) }}>
      <TouchableOpacity
        activeOpacity={0.75}
        disabled={disabled}
        onPress={() => onClick()}
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
                // textTransform: Boolean(value) ? 'capitalize' : 'uppercase'
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
          {value ? (
            <TouchableOpacity
              onPress={() => onChangeText({})}
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
            <Image source={signatureIcon} style={[styles.image]} />
          )}
        </View>
      </TouchableOpacity>

      <Modal
        backdropTransitionOutTiming={0}
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        style={{ flex: 1 }}
      >
        <SafeAreaView pointerEvents='box-none' style={{ flex: 1 }}>
          {/* <Box pointerEvents="box-none" flex={1} alignItems='center' justifyContent='center'> */}
          {/*    <Box flex={1} backgroundColor='white'  borderRadius={8}> */}
          <Box backgroundColor='white' borderRadius={10} flex={1} padding='sm'>
            <ToastMessage />
            <Box flexDirection='row' justifyContent='space-between'>
              <Text>Sign on the screen</Text>
              <Pressable
                // alignSelf='flex-end'
                alignItems='center'
                backgroundColor='harsh'
                borderRadius={14}
                height={28}
                justifyContent='center'
                // marginBottom="lg"
                onPress={() => setIsVisible(false)}
                width={28}
              >
                <Icon name='x-icon' size='s' />
              </Pressable>
            </Box>
            <SignatureCapture
              maxSize={200}
              onDragEvent={_onDragEvent}
              onSaveEvent={_onSaveEvent}
              ref='sign'
              showBorder={false}
              showNativeButtons={false}
              showTitleLabel={false}
              style={{ borderColor: '#000033', borderWidth: 1, flex: 1 }}
              viewMode='portrait'
              // backgroundColor={'red'}
            />
            <Box flexDirection='row' justifyContent='space-between'>
              <Box width='45%'>
                <TouchableOpacity
                  onPress={() => saveSign()}
                  style={styles.containerStyle}
                >
                  <Text style={{ color: 'white' }}>Save</Text>
                </TouchableOpacity>
              </Box>
              <Box width='45%'>
                <TouchableOpacity
                  onPress={() => resetSign()}
                  style={[
                    styles.containerStyle,
                    { backgroundColor: 'red', borderColor: 'red' },
                  ]}
                >
                  <Text style={{ color: 'white' }}>Reset</Text>
                </TouchableOpacity>
              </Box>
            </Box>
          </Box>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default SignatureButton;
