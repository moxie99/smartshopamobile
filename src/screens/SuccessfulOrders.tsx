import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, ScrollView } from 'react-native';

import {
  Box,
  BoxProps,
  Image,
  LayoutComponent,
  ScrollBox,
} from '../components/Base';
import SearchInput2 from '../components/Input/SearchInput2';
import { Text } from '../components/Typography';
import { palette, useTheme } from '../constants/theme';
import { heightPixel, screenWidth } from '../utils';

type Product = {
  _id: string;
  sellerId: string;
  name: string;
  slug: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  discount: number;
  description: string;
  shopName: string;
  images: string[];
  rating: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  quantity: number;
};

type PendingDetails = {
  orderId?: string;
  sellerId?: string;
  price?: string | number;
  payment_status?: string;
  shippingInfo?: string;
  delivery_status: string;
  date: string;
  products: Product[];
};

const TextBlock = ({
  left,
  right,
  ...rest
}: BoxProps & { left: string | undefined; right: string | undefined }) => (
  <Box flexDirection='row' justifyContent='space-between' {...rest}>
    <Text variant='medium12'>{left}</Text>
    <Text variant='regular12'>{right}</Text>
  </Box>
);

const Card = ({
  children,
  ...rest
}: BoxProps & { children: React.ReactNode }) => (
  <Box
    borderColor='black8'
    borderRadius={4}
    borderWidth={1}
    padding='md'
    paddingBottom='sl'
    width='100%'
    {...rest}
  >
    {children}
  </Box>
);

const CustomerCard = ({ details }: { details: PendingDetails }) => {
  return (
    <Card marginBottom='md'>
      <TextBlock left='orderId' marginBottom='md' right={details.orderId} />
      <TextBlock left='Price' marginBottom='md' right={details?.price} />
      <TextBlock
        left='Payment Status'
        marginBottom='md'
        right={details?.payment_status}
      />
      <TextBlock
        left='Shipping Info'
        marginBottom='md'
        right={details?.shippingInfo}
      />
      <TextBlock left='Delivery Status' right={details?.delivery_status} />
      <TextBlock left='Date' right={details?.date} />
      <ScrollView
        horizontal
        pagingEnabled
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {details.products.map((item) => (
          <Box key={item._id} marginRight={'sm'}>
            <>
              {item.images ? (
                <Image
                  src={item.images[0] as string}
                  height={heightPixel(200)}
                  width={screenWidth - 100}
                />
              ) : (
                <Box
                  height={heightPixel(200)}
                  width={screenWidth - 100}
                  backgroundColor={'primary'}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  <Text variant={'regular12'} color={'white'}>
                    No Image Available
                  </Text>
                </Box>
              )}
            </>
            <Box>
              <Box
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Text variant={'regular12'}>Name: </Text>
                <Text variant={'medium12'}>{item?.name}</Text>
              </Box>
              <Box
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Text variant={'regular12'}>Price: </Text>
                <Text variant={'medium12'}>{item?.price}</Text>
              </Box>
              <Box
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Text variant={'regular12'}>Quantity: </Text>
                <Text variant={'medium12'}>{item?.quantity}</Text>
              </Box>
              <Box
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Text variant={'regular12'}>Brand: </Text>
                <Text variant={'medium12'}>{item?.brand}</Text>
              </Box>
              <Box
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Text variant={'regular12'}>Category: </Text>
                <Text variant={'medium12'}>{item?.category}</Text>
              </Box>
            </Box>
          </Box>
        ))}
      </ScrollView>
    </Card>
  );
};

export default function SuccessfulOrders() {
  const { spacing, colors } = useTheme();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const pendingOrders = [
    {
      _id: '657c52fbf7b9d42518089354',
      orderId: '657c52fbf7b9d42518089351',
      sellerId: '655f6c3e58a8d8b72c2bd576',
      products: [
        {
          _id: '655fff8c7068ac890e1e08a4',
          sellerId: '655f6c3e58a8d8b72c2bd576',
          name: 'Dodoman',
          slug: 'Dodoman',
          category: 'Food',
          brand: 'Plantain Magic',
          price: 2500,
          stock: 3,
          discount: 2,
          description:
            'This is the easiest smoothie. It only has a handful of simple ingredients—banana, peanut butter',
          shopName: 'Gizz Dodo Corner',
          images: [
            'http://res.cloudinary.com/beyondthenorm-educational-consortium/image/upload/v1700790155/products/uxfgjsfnr755ylnz5tsy.jpg',
          ],
          rating: 0,
          createdAt: '2023-11-24T01:42:36.123Z',
          updatedAt: '2023-11-24T01:42:36.123Z',
          __v: 0,
          quantity: 2,
        },
        {
          _id: '655fb1817068ac890e1e083c',
          sellerId: '655f6c3e58a8d8b72c2bd576',
          name: 'Dodo',
          slug: 'Dodo',
          category: 'Discounted Products',
          brand: 'Gizz',
          price: 3000,
          stock: 20,
          discount: 5,
          description:
            'Dodo (no, not the bird) is the Nigerian name for sweet, fried ripe plantains',
          shopName: 'Fife',
          images: [
            'http://res.cloudinary.com/beyondthenorm-educational-consortium/image/upload/v1700770177/products/qbbdw2ukm72bfhbmkkpb.jpg',
          ],
          rating: 0,
          createdAt: '2023-11-23T20:09:37.235Z',
          updatedAt: '2023-11-23T20:09:37.235Z',
          __v: 0,
          quantity: 2,
        },
      ],
      price: 10072,
      payment_status: 'unpaid',
      shippingInfo: 'Dhaka myshop Warehouse',
      delivery_status: 'cancelled',
      date: 'December 15, 2023 2:22 PM',
      __v: 0,
      createdAt: '2023-12-15T13:22:03.620Z',
      updatedAt: '2023-12-15T13:22:19.793Z',
    },
    {
      _id: '6578d130622edfeb9f7cea7d',
      orderId: '6578d130622edfeb9f7cea7b',
      sellerId: '655f6c3e58a8d8b72c2bd576',
      products: [
        {
          _id: '656013177068ac890e1e09a2',
          sellerId: '655f6c3e58a8d8b72c2bd576',
          name: 'Dundo',
          slug: 'Dundo',
          category: 'Food',
          brand: 'Dundo',
          price: 2000,
          stock: 12,
          discount: 1,
          description:
            'However, if you still need to add additional CSS classes to an element that already has a Tailwind class applied, you can si',
          shopName: 'Gizz Dodo Corner',
          images: [
            'http://res.cloudinary.com/beyondthenorm-educational-consortium/image/upload/v1700795159/products/slepycwdnztqhaopqtrt.jpg',
          ],
          rating: 0,
          createdAt: '2023-11-24T03:05:59.656Z',
          updatedAt: '2023-11-24T03:05:59.656Z',
          __v: 0,
          quantity: 1,
        },
        {
          _id: '655fb2117068ac890e1e0842',
          sellerId: '655f6c3e58a8d8b72c2bd576',
          name: 'Dodo Prizz',
          slug: 'Dodo-Prizz',
          category: 'Lifestyle',
          brand: 'Dodp',
          price: 2200,
          stock: 20,
          discount: 0,
          description:
            'Dodo Lover (Twice Fried Ripe Plantains) – The Food Lover',
          shopName: 'Dodd',
          images: [
            'http://res.cloudinary.com/beyondthenorm-educational-consortium/image/upload/v1700770321/products/fzew7j2tydgi6i1zrjot.jpg',
          ],
          rating: 0,
          createdAt: '2023-11-23T20:12:01.862Z',
          updatedAt: '2023-11-23T20:12:01.862Z',
          __v: 0,
          quantity: 2,
        },
      ],
      price: 6061,
      payment_status: 'paid',
      shippingInfo: 'Dhaka myshop Warehouse',
      delivery_status: 'pending',
      date: 'December 12, 2023 10:31 PM',
      __v: 0,
      createdAt: '2023-12-12T21:31:28.917Z',
      updatedAt: '2023-12-12T21:32:51.171Z',
    },
    {
      _id: '65725e3476aa94891e22b1a4',
      orderId: '65725e3476aa94891e22b1a2',
      sellerId: '655f6c3e58a8d8b72c2bd576',
      products: [
        {
          _id: '655fb2117068ac890e1e0842',
          sellerId: '655f6c3e58a8d8b72c2bd576',
          name: 'Dodo Prizz',
          slug: 'Dodo-Prizz',
          category: 'Lifestyle',
          brand: 'Dodp',
          price: 2200,
          stock: 20,
          discount: 0,
          description:
            'Dodo Lover (Twice Fried Ripe Plantains) – The Food Lover',
          shopName: 'Dodd',
          images: [
            'http://res.cloudinary.com/beyondthenorm-educational-consortium/image/upload/v1700770321/products/fzew7j2tydgi6i1zrjot.jpg',
          ],
          rating: 0,
          createdAt: '2023-11-23T20:12:01.862Z',
          updatedAt: '2023-11-23T20:12:01.862Z',
          __v: 0,
          quantity: 3,
        },
      ],
      price: 6270,
      payment_status: 'paid',
      shippingInfo: 'Dhaka myshop Warehouse',
      delivery_status: 'pending',
      date: 'December 8, 2023 1:07 AM',
      __v: 0,
      createdAt: '2023-12-08T00:07:16.580Z',
      updatedAt: '2023-12-12T21:33:29.580Z',
    },
    {
      _id: '656e863acce8d351bbd992d1',
      orderId: '656e863acce8d351bbd992cf',
      sellerId: '655f6c3e58a8d8b72c2bd576',
      products: [
        {
          _id: '656e5a798f8d1866f8d97120',
          sellerId: '655f6c3e58a8d8b72c2bd576',
          name: 'Banana Youghurt',
          slug: 'Banana-Youghurt',
          category: 'Lifestyle',
          brand: 'Gizz',
          price: 3000,
          stock: 20,
          discount: 10,
          description:
            'A healthier twist on the traditional version, yet equally delicious, this recipe for Bananas Foste',
          shopName: 'Gizz Dodo Corner',
          images:
            Array(6)[
              ('http://res.cloudinary.com/beyondthenorm-educational-consortium/image/upload/v1701730932/products/y5jveemstvgryjru4fuj.jpg',
              'http://res.cloudinary.com/beyondthenorm-educational-consortium/image/upload/v1701730933/products/mhuwvmeaylx4ykdmhstw.jpg',
              'http://res.cloudinary.com/beyondthenorm-educational-consortium/image/upload/v1701730934/products/zp16flofxb0jjxme2ui7.jpg',
              'http://res.cloudinary.com/beyondthenorm-educational-consortium/image/upload/v1701730935/products/a7datmqyygalzy1hdglg.jpg',
              'http://res.cloudinary.com/beyondthenorm-educational-consortium/image/upload/v1701730935/products/rntauq4jrv22muqpanoj.jpg',
              'http://res.cloudinary.com/beyondthenorm-educational-consortium/image/upload/v1701730936/products/nwiicvbym6fhtivnqaii.jpg')
            ],
          rating: 0,
          createdAt: '2023-12-04T23:02:17.378Z',
          updatedAt: '2023-12-04T23:02:17.378Z',
          __v: 0,
          quantity: 1,
        },
        {
          _id: '656013177068ac890e1e09a2',
          sellerId: '655f6c3e58a8d8b72c2bd576',
          name: 'Dundo',
          slug: 'Dundo',
          category: 'Food',
          brand: 'Dundo',
          price: 2000,
          stock: 12,
          discount: 1,
          description:
            'However, if you still need to add additional CSS classes to an element that already has a Tailwind class applied, you can si',
          shopName: 'Gizz Dodo Corner',
          images: [
            'http://res.cloudinary.com/beyondthenorm-educational-consortium/image/upload/v1700795159/products/slepycwdnztqhaopqtrt.jpg',
          ],
          rating: 0,
          createdAt: '2023-11-24T03:05:59.656Z',
          updatedAt: '2023-11-24T03:05:59.656Z',
          __v: 0,
          quantity: 1,
        },
        {
          _id: '655fb2117068ac890e1e0842',
          sellerId: '655f6c3e58a8d8b72c2bd576',
          name: 'Dodo Prizz',
          slug: 'Dodo-Prizz',
          category: 'Lifestyle',
          brand: 'Dodp',
          price: 2200,
          stock: 20,
          discount: 0,
          description:
            'Dodo Lover (Twice Fried Ripe Plantains) – The Food Lover',
          shopName: 'Dodd',
          images: [
            'http://res.cloudinary.com/beyondthenorm-educational-consortium/image/upload/v1700770321/products/fzew7j2tydgi6i1zrjot.jpg',
          ],
          rating: 0,
          createdAt: '2023-11-23T20:12:01.862Z',
          updatedAt: '2023-11-23T20:12:01.862Z',
          __v: 0,
          quantity: 1,
        },
        {
          _id: '655fb1817068ac890e1e083c',
          sellerId: '655f6c3e58a8d8b72c2bd576',
          name: 'Dodo',
          slug: 'Dodo',
          category: 'Discounted Products',
          brand: 'Gizz',
          price: 3000,
          stock: 20,
          discount: 5,
          description:
            'Dodo (no, not the bird) is the Nigerian name for sweet, fried ripe plantains',
          shopName: 'Fife',
          images: [
            'http://res.cloudinary.com/beyondthenorm-educational-consortium/image/upload/v1700770177/products/qbbdw2ukm72bfhbmkkpb.jpg',
          ],
          rating: 0,
          createdAt: '2023-11-23T20:09:37.235Z',
          updatedAt: '2023-11-23T20:09:37.235Z',
          __v: 0,
          quantity: 1,
        },
      ],
      price: 9244,
      payment_status: 'paid',
      shippingInfo: 'Dhaka myshop Warehouse',
      delivery_status: 'pending',
      date: 'December 5, 2023 3:08 AM',
      __v: 0,
      createdAt: '2023-12-05T02:08:58.506Z',
      updatedAt: '2023-12-10T18:43:13.164Z',
    },
  ];
  const filterData =
    pendingOrders?.length > 0
      ? pendingOrders?.filter(
          (x: any) =>
            x.shippingInfo.toLowerCase().includes(search.toLowerCase()) ||
            x.products[0].name.toLowerCase().includes(search.toLowerCase())
        )
      : [];

  return (
    <LayoutComponent label='SUCCESSFUL ORDERS'>
      <Box backgroundColor='white' paddingHorizontal='md'>
        <Box
          alignItems='center'
          flexDirection='row'
          justifyContent='space-between'
          marginBottom='md'
          marginTop='lg'
        >
          <Text variant='bold16'>
            Successful Orders ({pendingOrders?.length})
          </Text>
        </Box>
        <SearchInput2
          onChangeText={(value) => setSearch(value)}
          placeholder='Search for ...'
          value={search}
        />
      </Box>
      {loading ? (
        <Box backgroundColor='white' flex={1} paddingHorizontal='md'>
          <Text variant='bold14'>Loading...</Text>
        </Box>
      ) : (
        <FlatList
          bounces={false}
          data={filterData}
          indicatorStyle='black'
          keyExtractor={(item, index) => item.orderId + index}
          renderItem={({ item }) => <CustomerCard details={item} />}
          style={{
            backgroundColor: colors.white,
            flex: 1,
            paddingHorizontal: spacing.md,
          }}
        />
      )}
    </LayoutComponent>
  );
}
