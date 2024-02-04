import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList } from 'react-native';

import { Box, BoxProps, LayoutComponent } from '../components/Base';
import SearchInput2 from '../components/Input/SearchInput2';
import { Text } from '../components/Typography';
import { useTheme } from '../constants/theme';
import { useGetSuccessAccounts } from '../hooks/useCreateRequest';

import useStore from '../store/useStore';
import { isLoading } from 'expo-font';

type CreatedDetails = {
  id: number;
  amount: number;
  status: string;
  date: string;
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

const paymentsArray: CreatedDetails[] = [
  {
    id: 1,
    amount: 50.0,
    status: 'Paid',
    date: '2024-02-04',
  },
  {
    id: 2,
    amount: 30.0,
    status: 'Pending',
    date: '2024-02-05',
  },
  {
    id: 3,
    amount: 75.5,
    status: 'Paid',
    date: '2024-02-06',
  },
  {
    id: 4,
    amount: 20.0,
    status: 'Failed',
    date: '2024-02-07',
  },
  {
    id: 5,
    amount: 40.25,
    status: 'Pending',
    date: '2024-02-08',
  },
];

const CustomerCard = ({ details }: { details: CreatedDetails }) => {
  return (
    <Card marginBottom='md'>
      <TextBlock left='Payment ID' marginBottom='md' right={details?.id} />
      <TextBlock left='Date' marginBottom='md' right={details.date} />
      <TextBlock left='Amount' marginBottom='md' right={details?.amount} />
      {/* <TextBlock left="CIF" marginBottom="md" right={details?.cif} /> */}
      <TextBlock left='Status' marginBottom='md' right={details?.status} />
    </Card>
  );
};

export default function SuccessfulPayment() {
  const { spacing, colors } = useTheme();
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const filterData =
    paymentsArray.length > 0
      ? paymentsArray.filter(
          (x: any) =>
            x.status.toLowerCase().includes(search.toLowerCase()) ||
            x.date.toLowerCase().includes(search.toLowerCase())
        )
      : [];

  return (
    <LayoutComponent label='SUCCESSFUL PAYMENTS'>
      <Box backgroundColor='white' paddingHorizontal='md'>
        <Box
          alignItems='center'
          flexDirection='row'
          justifyContent='space-between'
          marginBottom='md'
          marginTop='lg'
        >
          <Text variant='bold16'>
            Successful Payments ({paymentsArray.length})
          </Text>
        </Box>
        <SearchInput2
          onChangeText={(value) => setSearch(value)}
          placeholder='Search for payment...'
          value={search}
        />
      </Box>
      {isLoading ? (
        <Box backgroundColor='white' flex={1} paddingHorizontal='md'>
          <Text variant='bold14'>Loading...</Text>
        </Box>
      ) : (
        <FlatList
          bounces={false}
          data={filterData}
          indicatorStyle='black'
          keyExtractor={(item, index) => index.toString()}
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
