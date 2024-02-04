/* eslint-disable consistent-return */
import {
  CommonActions,
  createNavigationContainerRef,
} from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export const resetNavigation = (route: string) => {
  if (navigationRef.isReady()) {
    return navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: route,
          },
        ],
      }),
    );
  }
};
