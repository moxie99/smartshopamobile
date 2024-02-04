import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { Box, BoxProps, Icon, LayoutComponent } from '../components/Base';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Text, TextProps } from '../components/Typography';
import { wp } from '../constants/';
import { useTheme } from '../constants/theme';
import { Details, fakeServer } from '../utils/';

const labelProps: TextProps = {
  color: 'deepBlue',
  variant: 'medium12',
};

const TextBlock = ({
  left,
  right,
  ...rest
}: BoxProps & { left: string; right: string }) => (
  <Box
    flexDirection='row'
    justifyContent='space-between'
    marginBottom='md'
    {...rest}
  >
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

const CustomerCard = ({ details }: { details: Details }) => {
  const navigation = useNavigation();
  const handleTap = () => {
    navigation.navigate('RequestDetailsScreen');
  };

  return (
    <Card marginBottom='md'>
      <TextBlock left='Customers Name' right={details.customerName} />
      <TextBlock left='BVN' right={details.bvn} />
      <TextBlock
        left='Sanction Screening Status'
        right={details.screeningStatus}
      />
      <TextBlock
        left='Sanction Screening Status Outcome'
        right={details.screeningStatusOutcome}
      />
      <TextBlock left='Request Date' right={details.requestDate} />
      <TextBlock
        left='Account has been opened'
        right={String(details.isOpened)}
      />
      <TextBlock left='Account Number' right={details.accountNumber} />
      <TextBlock
        left='Onboarding has been terminated'
        right={String(details.wasTerminated)}
      />
      <TextBlock
        left='Account no has been sent to customers phone'
        marginBottom='lg'
        right={String(details.numberSent)}
      />
      <Button
        backgroundColor='deepBlue8'
        label='TAP TO OPEN'
        labelProps={labelProps}
        onPress={handleTap}
        paddingVertical='sml'
        width={wp(109)}
      />
    </Card>
  );
};

export default function NewRequestScreen() {
  const [loading, setLoading] = useState(false);
  const { spacing, colors } = useTheme();
  const [data, setData] = useState<Details[]>([]);
  const [search, setSearch] = useState<Details[]>([]);

  const getData = async () => {
    setLoading(true);
    const result = await fakeServer.get('/details');
    setLoading(false);

    if (result) {
      setData(result);
      setSearch(result);
    }
  };

  const handleSearch = (text: string) => {
    if (text === '') {
      setSearch(data);
    }
    const filtered = data.filter((node) =>
      node.customerName.toLowerCase().includes(text.toLowerCase())
    );
    setSearch(filtered);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <LayoutComponent label='NEW REQUEST'>
      <Box backgroundColor='white' paddingHorizontal='md'>
        <Box
          alignItems='center'
          flexDirection='row'
          justifyContent='space-between'
          marginBottom='md'
          marginTop='lg'
        >
          <Text variant='bold16'>New Request (232)</Text>
          <Box alignItems='center' flexDirection='row'>
            <Text color='deepBlue' marginRight='sml' variant='bold14'>
              Filter by
            </Text>
            <Icon name='filter-icon' size='m' />
          </Box>
        </Box>
        <Input
          defaultValue=''
          onChangeText={handleSearch}
          placeholder='Search for customers name'
          renderSearchIcon
        />
      </Box>
      {loading ? (
        <Box backgroundColor='white' flex={1} paddingHorizontal='md'>
          <Text variant='bold14'>Loading...</Text>
        </Box>
      ) : (
        <FlatList
          bounces={false}
          data={search}
          indicatorStyle='black'
          keyExtractor={(index) => index.customerName}
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
