import { FlatList, StyleSheet, View, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import { Box, Image, LayoutComponent, ScrollBox } from '../components/Base';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { palette } from '../constants/theme';
import { homepage2, sibLogo } from '../assets/images';
import { Text } from '../components/Typography';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from '../components/Button';
import { heightPixel } from '../utils';
import navigation from '../navigation';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';
import LottieView from 'lottie-react-native';
import { successful } from '../assets/lottie';
import { resetNavigation } from '../navigation/ResetNavigator';

const photos = [
  'http://res.cloudinary.com/beyondthenorm-educational-consortium/image/upload/v1700770321/products/fzew7j2tydgi6i1zrjot.jpg',
  'http://res.cloudinary.com/beyondthenorm-educational-consortium/image/upload/v1700770321/products/fzew7j2tydgi6i1zrjot.jpg',
  'http://res.cloudinary.com/beyondthenorm-educational-consortium/image/upload/v1700770321/products/fzew7j2tydgi6i1zrjot.jpg',
  'http://res.cloudinary.com/beyondthenorm-educational-consortium/image/upload/v1700770321/products/fzew7j2tydgi6i1zrjot.jpg',
];
const PhotosRoutes = () => (
  <View style={{ flex: 1 }}>
    <FlatList
      data={photos}
      numColumns={3}
      renderItem={({ item, index }) => {
        console.log(item);
        return (
          <Box
            style={{
              flex: 1,
              aspectRatio: 1,
              margin: 3,
              backgroundColor: 'red',
            }}
          >
            <Image key={index} src={item} height={heightPixel(200)} />
          </Box>
        );
      }}
    />
  </View>
);

const LikesRoutes = () => <Box backgroundColor={'primary'} />;

const renderScene = SceneMap({
  first: PhotosRoutes,
  second: LikesRoutes,
});
const Account = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const openModal = () => {
    setIsVisible(!isVisible);
  };

  const navigation = useNavigation();
  const [routes] = useState([
    { key: 'first', title: 'Photos' },
    { key: 'second', title: 'Likes' },
  ]);
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: palette.primary,
      }}
      style={{
        backgroundColor: palette.white,
        height: 44,
      }}
      renderLabel={({ focused, route }) => (
        <Text
          variant={'medium12'}
          style={[{ color: focused ? palette.black : palette.grey }]}
        >
          {route.title}
        </Text>
      )}
    />
  );
  return (
    <LayoutComponent label='Profile' isIcon>
      <ScrollBox backgroundColor={'white'}>
        <Box style={{ width: '100%' }}>
          <Image
            source={homepage2}
            resizeMode='cover'
            style={{
              height: 228,
              width: '100%',
            }}
          />
        </Box>

        <Box style={{ flex: 1, alignItems: 'center' }}>
          <Image
            source={sibLogo}
            resizeMode='contain'
            style={{
              height: 155,
              width: 155,
              borderRadius: 999,
              borderColor: palette.primary,
              borderWidth: 2,
              marginTop: -90,
            }}
          />

          <Text color={'primary'} marginVertical={'sm'} variant={'medium12'}>
            Melissa Peters
          </Text>
          <Text variant={'medium12'} color={'black'}>
            Tiwa Kitchen
          </Text>

          <View
            style={{
              flexDirection: 'row',
              marginVertical: 6,
              alignItems: 'center',
            }}
          >
            <MaterialIcons name='location-on' size={24} color='black' />
            <Text variant={'regular12'} marginLeft={'sm'}>
              Lagos, Nigeria
            </Text>
          </View>

          <Box
            style={{
              paddingVertical: 8,
              flexDirection: 'row',
            }}
          >
            <Box
              style={{
                flexDirection: 'column',
                alignItems: 'center',
              }}
              marginHorizontal={'sm'}
            >
              <Text variant={'regular12'} color={'primary'}>
                122
              </Text>
              <Text variant={'medium12'} color={'primary'}>
                Orders
              </Text>
            </Box>

            <Box
              style={{
                flexDirection: 'column',
                alignItems: 'center',
              }}
              marginHorizontal={'sm'}
            >
              <Text variant={'bold14'} color={'primary'}>
                57
              </Text>
              <Text variant={'regular12'} color={'primary'}>
                Payments
              </Text>
            </Box>

            <Box
              style={{
                flexDirection: 'column',
                alignItems: 'center',
              }}
              marginHorizontal={'sm'}
            >
              <Text color={'primary'} variant={'regular12'}>
                77K
              </Text>
              <Text variant={'medium12'} color={'primary'}>
                Products
              </Text>
            </Box>
          </Box>

          <View style={{ flexDirection: 'row', gap: heightPixel(40) }}>
            <Button
              onPress={() => navigation.navigate('EditProfile')}
              padding={'md'}
              label=' Edit Profile'
              backgroundColor={'primary'}
            />

            <Button
              padding={'md'}
              label='More'
              onPress={openModal}
              backgroundColor={'primary'}
            />
          </View>
        </Box>

        {/* <Box style={{ flex: 1, marginHorizontal: 22, marginTop: 20 }}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
          />
        </Box> */}
      </ScrollBox>
      <Modal isVisible={isVisible}>
        <Box
          alignItems='center'
          backgroundColor='white'
          borderRadius={10}
          justifyContent='center'
          padding='sm'
        >
          <Box height={RFValue(150)} width='100%'>
            <LottieView autoPlay loop source={successful} />
          </Box>

          <Text
            color='black'
            marginBottom='sm'
            marginTop='sm'
            variant='medium14'
          >
            Please, carry out actions here carefully.
          </Text>
          <Box
            marginBottom='xxl'
            marginTop='sm'
            style={{ width: RFValue(100) }}
          >
            <Button
              backgroundColor={'error'}
              label='Delete Account'
              onPress={() => {
                resetNavigation('LoginScreen');
              }}
            />
          </Box>
          <Box
            marginBottom='xxl'
            marginTop='sm'
            style={{ width: RFValue(100) }}
          >
            <Button
              backgroundColor={'error'}
              label='Log Out'
              onPress={() => {
                resetNavigation('LoginScreen');
              }}
            />
          </Box>
        </Box>
      </Modal>
    </LayoutComponent>
  );
};

export default Account;

const styles = StyleSheet.create({});
