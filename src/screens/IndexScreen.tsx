import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { homepage2, logo } from '../assets/images';
import { Box, Image, ImageBackground } from '../components/Base';
import { BlurButton } from '../components/Button';
import { Text } from '../components/Typography';
import { hp } from '../constants/layout';

const styles = StyleSheet.create({
  margin: {
    marginTop: hp(90),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  text: {
    maxWidth: 200,
  },
});

export default function IndexScreen() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('LoginScreen');
  };

  const createAccount = () => {
    navigation.navigate('CreateRequestScreen');
  };

  return (
    <Box alignItems='center' flex={1} justifyContent='center'>
      <StatusBar style='light' />
      <ImageBackground
        flex={1}
        resizeMode='stretch'
        source={homepage2}
        width='100%'
      >
        <View style={styles.overlay} />
        <SafeAreaView edges={['bottom', 'top']} style={styles.safeArea}>
          <Box alignSelf='center' style={styles.margin}>
            <Image marginBottom='sl' source={logo} />
            <Text
              color='white'
              marginBottom='sm'
              style={styles.text}
              variant='bold24'
            >
              FoodMart
            </Text>
            <Text color='white' style={styles.text} variant='regular14'>
              Register or Log In as a Vendor
            </Text>
          </Box>
          <Box>
            <BlurButton
              icon='caret-right-icon'
              label='Log In'
              onPress={handlePress}
            />
            <BlurButton
              icon='caret-right-icon'
              label='Create Account'
              onPress={createAccount}
            />
          </Box>
        </SafeAreaView>
      </ImageBackground>
    </Box>
  );
}
