import * as Updates from 'expo-updates';
import React from 'react';
import { useTranslation, withTranslation } from 'react-i18next';

import { Box } from '../Base';
import { Pressable } from '../Button';
import { Text } from '../Typography';

/**
 * Restarts the app on press
 */
const handleRestart = async () => {
  Updates.reloadAsync();
};

/**
 * Fallback Screen for ErrorBoundary, this screen is displayed when the app crashes
 * due to an error in our component tree.
 */
function FallBack() {
  const { t } = useTranslation();

  return (
    <Box
      alignItems='center'
      backgroundColor='black'
      flex={1}
      justifyContent='center'
    >
      <Text variant='body'>{t('error.title')}</Text>
      <Text variant='body'>{t('error.details')}</Text>
      <Pressable onPress={handleRestart}>
        <Text variant='body'>{t('error.button-action')}</Text>
      </Pressable>
    </Box>
  );
}

export default withTranslation()(FallBack);
