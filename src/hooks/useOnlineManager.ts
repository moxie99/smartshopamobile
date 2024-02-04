/* eslint-disable consistent-return */
import NetInfo from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { onlineManager } from 'react-query';

import { isWeb } from '../constants';

function useOnlineManager() {
  useEffect(() => {
    if (!isWeb) {
      return NetInfo.addEventListener((state) => {
        onlineManager.setOnline(
          state.isConnected != null &&
            state.isConnected &&
            Boolean(state.isInternetReachable)
        );
      });
    }
  }, []);
}

export default useOnlineManager;
