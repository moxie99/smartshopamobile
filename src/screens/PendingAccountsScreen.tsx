import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList } from 'react-native';

import { Box, BoxProps, LayoutComponent } from '../components/Base';
import SearchInput2 from '../components/Input/SearchInput2';
import { Text } from '../components/Typography';
import { useTheme } from '../constants/theme';
import { useGetPendingAccounts } from '../hooks/useCreateRequest';

import useStore from '../store/useStore';

type PendingDetails = {
  bvn?: string;
  cif?: string;
  firstName?: string;
  lastName?: string;
  reason?: string;
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
  const navigation = useNavigation();

  return (
    <Card marginBottom='md'>
      <TextBlock
        left='First Name'
        marginBottom='md'
        right={details.firstName}
      />
      <TextBlock left='Last Name' marginBottom='md' right={details?.lastName} />
      <TextBlock
        left='Account type'
        marginBottom='md'
        right={details?.accountTypeRequested}
      />
      <TextBlock left='Date Created' right={details?.dateCreated} />
    </Card>
  );
};

export default function PendingAccountsScreen() {
  const { userData } = useStore((state) => state);
  const { spacing, colors } = useTheme();
  const [search, setSearch] = useState('');
  const { pendingAccounts, isLoadingPendingAccounts } =
    useGetPendingAccounts(userData);
  const filterData =
    pendingAccounts?.content?.length > 0
      ? pendingAccounts?.content.filter(
          (x: any) =>
            x.firstName.toLowerCase().includes(search.toLowerCase()) ||
            x.lastName.toLowerCase().includes(search.toLowerCase())
        )
      : [];

  return (
    <LayoutComponent label='PENDING ACCOUNTS'>
      <Box backgroundColor='white' paddingHorizontal='md'>
        <Box
          alignItems='center'
          flexDirection='row'
          justifyContent='space-between'
          marginBottom='md'
          marginTop='lg'
        >
          <Text variant='bold16'>
            Pending Accounts ({pendingAccounts?.content?.length})
          </Text>
        </Box>
        <SearchInput2
          onChangeText={(value) => setSearch(value)}
          placeholder='Search for customers name...'
          value={search}
        />
      </Box>
      {isLoadingPendingAccounts ? (
        <Box backgroundColor='white' flex={1} paddingHorizontal='md'>
          <Text variant='bold14'>Loading...</Text>
        </Box>
      ) : (
        <FlatList
          bounces={false}
          data={filterData}
          indicatorStyle='black'
          keyExtractor={(item, index) => item.bvn + index}
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
