import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList } from 'react-native';

import { Box, BoxProps, LayoutComponent } from '../components/Base';
import SearchInput2 from '../components/Input/SearchInput2';
import { Text } from '../components/Typography';
import { useTheme } from '../constants/theme';
import { useGetSuccessAccounts } from '../hooks/useCreateRequest';

import useStore from '../store/useStore';

type CreatedDetails = {
  bvn?: string;
  cif?: string;
  firstName?: string;
  lastName?: string;
  reason?: string;
  accountNumber?: string;
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

const CustomerCard = ({ details }: { details: CreatedDetails }) => {
  const navigation = useNavigation();

  return (
    <Card marginBottom='md'>
      <TextBlock
        left='Account Number'
        marginBottom='md'
        right={details?.accountNumber}
      />
      <TextBlock
        left='First Name'
        marginBottom='md'
        right={details.firstName}
      />
      <TextBlock left='Last Name' marginBottom='md' right={details?.lastName} />
      {/* <TextBlock left="CIF" marginBottom="md" right={details?.cif} /> */}
      <TextBlock
        left='Account type'
        marginBottom='md'
        right={details?.accountTypeRequested}
      />
      <TextBlock left='Date Created' right={details?.dateCreated} />
      {/* <TextBlock */}
      {/*  left="Reason" */}
      {/*  right={details?.reason} */}
      {/* /> */}
    </Card>
  );
};

export default function CreatedAccountsScreen() {
  const { userData } = useStore((state) => state);
  const { spacing, colors } = useTheme();
  const [search, setSearch] = useState('');
  const { successAccounts, isLoadingSuccessAccounts } =
    useGetSuccessAccounts(userData);
  const filterData =
    successAccounts?.content?.length > 0
      ? successAccounts?.content.filter(
          (x: any) =>
            x.firstName.toLowerCase().includes(search.toLowerCase()) ||
            x.lastName.toLowerCase().includes(search.toLowerCase())
        )
      : [];

  return (
    <LayoutComponent label='CREATED ACCOUNTS'>
      <Box backgroundColor='white' paddingHorizontal='md'>
        <Box
          alignItems='center'
          flexDirection='row'
          justifyContent='space-between'
          marginBottom='md'
          marginTop='lg'
        >
          <Text variant='bold16'>
            Created Accounts ({successAccounts?.content?.length})
          </Text>
        </Box>
        <SearchInput2
          onChangeText={(value) => setSearch(value)}
          placeholder='Search for customers name...'
          value={search}
        />
      </Box>
      {isLoadingSuccessAccounts ? (
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
