import { AtLeastOneResponsiveValue } from '@shopify/restyle/dist/types';
import React, { useState } from 'react';
import { FlatList } from 'react-native';

import { Box, BoxProps, LayoutComponent } from '../components/Base';
import SearchInput2 from '../components/Input/SearchInput2';
import { Text } from '../components/Typography';
import { useTheme } from '../constants/theme';
import { useGetFailedAccounts } from '../hooks/useCreateRequest';

import useStore from '../store/useStore';

type FailedDetails = {
  dateCreated:
    | ((
        | string
        | number
        | AtLeastOneResponsiveValue<
            string | number | undefined,
            {
              breakpoints: { bigscreen: number; phone: number; tablet: number };
              colors: {
                blockBg: string;
                buttonPry: string;
                mainBackground: string;
                textColor: string;
                textColorTint: string;
                black: string;
                black8: string;
                blackTint: string;
                blue: string;
                blueb6: string;
                burgundy: string;
                burgundy16: string;
                classicBlue: string;
                classicBlue16: string;
                darkBlue: string;
                deepBlue: string;
                deepBlue12: string;
                deepBlue8: string;
                error: string;
                fadeBlue: string;
                grey: string;
                harsh: string;
                lightblue: string;
                lightgray: string;
                primary: string;
                purple: string;
                purple16: string;
                secondary: string;
                success: string;
                success2: string;
                success3: string;
                transparent: string;
                white: string;
                red: string;
              };
              iconsizes: {
                l: { height: number; width: number };
                m: { height: number; width: number };
                s: { height: number; width: number };
                xl: { height: number; width: number };
                xs: { height: number; width: number };
                xxl: { height: number; width: number };
              };
              spacing: {
                Ml: number;
                lg: number;
                md: number;
                sl: number;
                sm: number;
                sml: number;
                xl: number;
                xs: number;
                xxl: number;
                xxs: number;
              };
              textVariants: {
                body: {
                  color: string;
                  fontFamily: string;
                  fontSize: number;
                  fontWeight: string;
                  lineHeight: number;
                };
                bold14: {
                  color: string;
                  fontFamily: string;
                  fontSize: number;
                  fontWeight: string;
                };
                bold16: {
                  color: string;
                  fontFamily: string;
                  fontSize: number;
                  fontWeight: string;
                };
                bold24: {
                  color: string;
                  fontFamily: string;
                  fontSize: number;
                  fontWeight: string;
                  lineHeight: number;
                };
                boldBody: {
                  color: string;
                  fontFamily: string;
                  fontSize: number;
                  fontWeight: string;
                  lineHeight: number;
                };
                button: {
                  color: string;
                  fontFamily: string;
                  fontSize: number;
                  fontWeight: string;
                };
                header: {
                  color: string;
                  fontFamily: string;
                  fontSize: number;
                  fontWeight: string;
                  lineHeight: number;
                };
                medium12: {
                  color: string;
                  fontFamily: string;
                  fontSize: number;
                  fontWeight: string;
                  lineHeight: number;
                };
                medium14: {
                  color: string;
                  fontFamily: string;
                  fontSize: number;
                  fontWeight: string;
                };
                medium16: {
                  color: string;
                  fontFamily: string;
                  fontSize: number;
                  fontWeight: string;
                };
                regular12: {
                  color: string;
                  fontFamily: string;
                  fontSize: number;
                  fontWeight: string;
                  lineHeight: number;
                };
                regular14: {
                  color: string;
                  fontFamily: string;
                  fontSize: number;
                  fontWeight: string;
                  lineHeight: number;
                };
                subHeading: {
                  color: string;
                  fontFamily: string;
                  fontSize: number;
                  fontWeight: string;
                  lineHeight: number;
                };
              };
            },
            { bigscreen: number; phone: number; tablet: number },
            {
              bigscreen: Record<'bigscreen', string | number | undefined>;
              phone: Record<'phone', string | number | undefined>;
              tablet: Record<'tablet', string | number | undefined>;
            }
          >
      ) &
        string)
    | undefined;
  accountTypeRequested:
    | ((
        | string
        | number
        | AtLeastOneResponsiveValue<
            string | number | undefined,
            {
              breakpoints: { bigscreen: number; phone: number; tablet: number };
              colors: {
                blockBg: string;
                buttonPry: string;
                mainBackground: string;
                textColor: string;
                textColorTint: string;
                black: string;
                black8: string;
                blackTint: string;
                blue: string;
                blueb6: string;
                burgundy: string;
                burgundy16: string;
                classicBlue: string;
                classicBlue16: string;
                darkBlue: string;
                deepBlue: string;
                deepBlue12: string;
                deepBlue8: string;
                error: string;
                fadeBlue: string;
                grey: string;
                harsh: string;
                lightblue: string;
                lightgray: string;
                primary: string;
                purple: string;
                purple16: string;
                secondary: string;
                success: string;
                success2: string;
                success3: string;
                transparent: string;
                white: string;
                red: string;
              };
              iconsizes: {
                l: { height: number; width: number };
                m: { height: number; width: number };
                s: { height: number; width: number };
                xl: { height: number; width: number };
                xs: { height: number; width: number };
                xxl: { height: number; width: number };
              };
              spacing: {
                Ml: number;
                lg: number;
                md: number;
                sl: number;
                sm: number;
                sml: number;
                xl: number;
                xs: number;
                xxl: number;
                xxs: number;
              };
              textVariants: {
                body: {
                  color: string;
                  fontFamily: string;
                  fontSize: number;
                  fontWeight: string;
                  lineHeight: number;
                };
                bold14: {
                  color: string;
                  fontFamily: string;
                  fontSize: number;
                  fontWeight: string;
                };
                bold16: {
                  color: string;
                  fontFamily: string;
                  fontSize: number;
                  fontWeight: string;
                };
                bold24: {
                  color: string;
                  fontFamily: string;
                  fontSize: number;
                  fontWeight: string;
                  lineHeight: number;
                };
                boldBody: {
                  color: string;
                  fontFamily: string;
                  fontSize: number;
                  fontWeight: string;
                  lineHeight: number;
                };
                button: {
                  color: string;
                  fontFamily: string;
                  fontSize: number;
                  fontWeight: string;
                };
                header: {
                  color: string;
                  fontFamily: string;
                  fontSize: number;
                  fontWeight: string;
                  lineHeight: number;
                };
                medium12: {
                  color: string;
                  fontFamily: string;
                  fontSize: number;
                  fontWeight: string;
                  lineHeight: number;
                };
                medium14: {
                  color: string;
                  fontFamily: string;
                  fontSize: number;
                  fontWeight: string;
                };
                medium16: {
                  color: string;
                  fontFamily: string;
                  fontSize: number;
                  fontWeight: string;
                };
                regular12: {
                  color: string;
                  fontFamily: string;
                  fontSize: number;
                  fontWeight: string;
                  lineHeight: number;
                };
                regular14: {
                  color: string;
                  fontFamily: string;
                  fontSize: number;
                  fontWeight: string;
                  lineHeight: number;
                };
                subHeading: {
                  color: string;
                  fontFamily: string;
                  fontSize: number;
                  fontWeight: string;
                  lineHeight: number;
                };
              };
            },
            { bigscreen: number; phone: number; tablet: number },
            {
              bigscreen: Record<'bigscreen', string | number | undefined>;
              phone: Record<'phone', string | number | undefined>;
              tablet: Record<'tablet', string | number | undefined>;
            }
          >
      ) &
        string)
    | undefined;
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

const CustomerCard = ({ details }: { details: FailedDetails }) => {
  const errorDescMatch = details?.reason.match(/<ErrorDesc>(.*?)<\/ErrorDesc>/);
  const errorDesc = errorDescMatch ? errorDescMatch[1] : '';
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
      <TextBlock
        left='Date Created'
        marginBottom='md'
        right={details?.dateCreated}
      />
      <TextBlock
        left='Reason'
        right={
          errorDesc?.length > 5
            ? errorDesc
            : 'Account creation failed, please try again'
        }
      />
    </Card>
  );
};

export default function FailedAccountsScreen() {
  const { userData } = useStore((state) => state);
  const { spacing, colors } = useTheme();
  const [search, setSearch] = useState('');
  const { failedAccounts, isLoadingFailedAccounts } =
    useGetFailedAccounts(userData);
  const filterData =
    failedAccounts?.content?.length > 0
      ? failedAccounts?.content.filter(
          (x: any) =>
            x.firstName.toLowerCase().includes(search.toLowerCase()) ||
            x.lastName.toLowerCase().includes(search.toLowerCase())
        )
      : [];

  return (
    <LayoutComponent label='FAILED ACCOUNTS'>
      <Box backgroundColor='white' paddingHorizontal='md'>
        <Box
          alignItems='center'
          flexDirection='row'
          justifyContent='space-between'
          marginBottom='md'
          marginTop='lg'
        >
          <Text variant='bold16'>
            Failed Accounts ({failedAccounts?.content?.length})
          </Text>
        </Box>
        <SearchInput2
          onChangeText={(value) => setSearch(value)}
          placeholder='Search for customers name...'
          value={search}
        />
      </Box>
      {isLoadingFailedAccounts ? (
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
