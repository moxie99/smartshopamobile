import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { Box, BoxProps, LayoutComponent, ScrollBox } from '../components/Base';
import { Button } from '../components/Button';
import { Text, TextProps } from '../components/Typography';

const labelProps: TextProps = { variant: 'medium12' };

const Card = ({
  children,
  ...rest
}: BoxProps & { children: React.ReactNode }) => (
  <Box
    borderColor='black8'
    borderRadius={4}
    borderWidth={1}
    paddingVertical='md'
    width='100%'
    {...rest}
  >
    {children}
  </Box>
);

const DetailBlock = ({
  children,
  title,
  ...rest
}: BoxProps & {
  children: React.ReactNode;
  title: string;
}) => (
  <Box {...rest}>
    <Box
      backgroundColor='deepBlue12'
      marginBottom='sml'
      paddingHorizontal='md'
      paddingVertical='sml'
      width='100%'
    >
      <Text variant='medium12'>{title}</Text>
    </Box>
    {children}
  </Box>
);

const TextBlock = ({
  bottomText,
  bottomTextProps,
  topText,
  topTextProps,
  ...rest
}: BoxProps & {
  bottomText: string;
  bottomTextProps?: TextProps;
  topText: string;
  topTextProps?: TextProps;
}) => (
  <Box marginBottom='md' marginLeft='md' {...rest}>
    <Text marginBottom='xs' variant='medium12' {...topTextProps}>
      {topText}
    </Text>
    <Text variant='regular12' {...bottomTextProps}>
      {bottomText}
    </Text>
  </Box>
);

export default function RequestDetailsScreen() {
  const navigation = useNavigation();

  return (
    <LayoutComponent label='NEW REQUEST'>
      <ScrollBox
        backgroundColor='white'
        bounces={false}
        flex={1}
        paddingHorizontal='md'
      >
        <Text marginBottom='md' marginTop='lg' variant='bold16'>
          26378909833
        </Text>
        <Card marginBottom='xl'>
          <TextBlock bottomText='2637890983' topText='BVN' />
          <TextBlock bottomText='Submitted' topText='Passport' />
          <TextBlock bottomText='23/06/2021' topText='Date opened' />
          <TextBlock bottomText='Savings' topText='Account Type' />
          <TextBlock bottomText='unopened' topText='Status' />
          <TextBlock bottomText='22/08/1992' topText='DOB' />
          <DetailBlock title='Personal Information'>
            <TextBlock bottomText='2637890983' topText='BVN' />
            <TextBlock bottomText='2637890983' topText='BVN' />
            <TextBlock bottomText='2637890983' topText='BVN' />
            <TextBlock bottomText='2637890983' topText='BVN' />
            <TextBlock bottomText='2637890983' topText='BVN' />
            <TextBlock bottomText='2637890983' topText='BVN' />
          </DetailBlock>
        </Card>
        <Button
          backgroundColor='classicBlue'
          borderRadius={10}
          label='CONTINUE'
          labelProps={labelProps}
          marginBottom='sml'
          onPress={() => navigation.navigate('BvnInfoScreen')}
          paddingVertical='md'
        />
      </ScrollBox>
    </LayoutComponent>
  );
}
