import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

import { accordionDown } from '../../assets/images';
import { Box, Image } from '../Base';
import { Text } from '../Typography';

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  image: {
    height: 8,
    width: 13,
  },
  rotate: { transform: [{ rotate: '270deg' }] },
});

interface Type {
  title: string;
  content: string;
}

interface DropDownButtonProps {
  sections: Array<Type>;
}

const renderHeader = (section: Type, _index: number, isActive: boolean) => (
  <Box style={styles.headerContainer}>
    <Text variant='medium14'>{section.title}</Text>
    <Image
      source={accordionDown}
      style={[styles.image, !isActive && styles.rotate, { marginRight: 10 }]}
    />
  </Box>
);

const renderContent = (section: Type) => (
  <Box padding='sm'>
    <Text variant='regular14'>{section.content}</Text>
  </Box>
);

export default function DropDownButton({ sections }: DropDownButtonProps) {
  const [activeSections, setActiveSections] = useState([]);

  const updateSections = (activeSectionsValue: any) => {
    setActiveSections(activeSectionsValue);
  };

  return (
    <Accordion
      activeSections={activeSections}
      onChange={updateSections}
      renderContent={renderContent}
      renderHeader={renderHeader}
      sections={sections}
      underlayColor='white'
    />
  );
}
