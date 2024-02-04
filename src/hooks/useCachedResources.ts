/* eslint-disable unicorn/prefer-module */
/* eslint-disable global-require */
import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          //   Require local fonts
          "bento-black": require("../assets/fonts/BentonSans-Black.ttf"),
          "bento-bold": require("../assets/fonts/BentonSans-Bold.ttf"),
          "bento-book": require("../assets/fonts/BentonSans-Book.ttf"),
          "bento-medium": require("../assets/fonts/BentonSans-Medium.ttf"),
          "bento-regular": require("../assets/fonts/BentonSans-Regular.ttf"),
        });
      } catch {
        // We might want to provide this error information to an error reporting service
        // eslint-disable-next-line no-console
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
