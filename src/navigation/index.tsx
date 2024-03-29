import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import { withTranslation } from 'react-i18next';

import { navigationRef } from './ResetNavigator';
import {
  ProductDetailsScreen,
  TermsAndAgreementScreen,
  CompDocScreen,
  DeliveryPreferenceScreen,
  CreateRequestScreen,
  HomeScreen,
  IndexScreen,
  LoginScreen,
  NewRequestScreen,
  PaymentAndBillingScreen,
  RequestDetailsScreen,
} from '../screens/';
import CreatedAccountsScreen from '../screens/CreatedAccountsScreen';
import FailedAccountsScreen from '../screens/FailedAccountsScreen';
import NextOfKinScreen from '../screens/NextOfKinScreen';
import PendingAccountsScreen from '../screens/PendingAccountsScreen';

import type { AppNavRoutes } from './types';
import { ProductBottomTab } from './bottomNavs/ProductBottomTab';
import { OrderBottomTab } from './bottomNavs/OrderBottomTab';
import { PaymentBottomTab } from './bottomNavs/PaymentBottomTab';
import EditProfile from '../screens/EditProfile';
import { MainBottomTab } from './bottomNavs/MainBottomTab';
import BusinessNameScreen from '../screens/BusinessNameScreen';

export type AppNavScreenProps<Screen extends keyof AppNavRoutes> =
  StackScreenProps<AppNavRoutes, Screen>;

const Stack = createStackNavigator<AppNavRoutes>();

function Navigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerShown: false,
        }}
      >
        <Stack.Screen component={IndexScreen} name='IndexScreen' />
        <Stack.Screen component={LoginScreen} name='LoginScreen' />
        <Stack.Screen component={HomeScreen} name='HomeScreen' />
        <Stack.Screen
          component={CreateRequestScreen}
          name='CreateRequestScreen'
        />
        <Stack.Screen component={NewRequestScreen} name='NewRequestScreen' />
        <Stack.Screen
          component={RequestDetailsScreen}
          name='RequestDetailsScreen'
        />
        <Stack.Screen
          component={ProductDetailsScreen}
          name='ProductDetailsScreen'
        />
        <Stack.Screen component={CompDocScreen} name='CompDocScreen' />
        <Stack.Screen
          component={DeliveryPreferenceScreen}
          name='DeliveryPreferenceScreen'
        />
        <Stack.Screen
          component={TermsAndAgreementScreen}
          name='TermsAndAgreementScreen'
        />
        <Stack.Screen
          component={PaymentAndBillingScreen}
          name='PaymentAndBillingScreen'
        />
        <Stack.Screen component={EditProfile} name='EditProfile' />
        <Stack.Screen component={NextOfKinScreen} name='NextOfKinScreen' />
        <Stack.Screen
          component={PendingAccountsScreen}
          name='PendingAccountScreen'
        />
        <Stack.Screen
          component={CreatedAccountsScreen}
          name='CreatedAccountScreen'
        />
        <Stack.Screen
          component={FailedAccountsScreen}
          name='FailedAccountScreen'
        />
        {/* bottom Navs */}

        <Stack.Screen name='ProductRoot' component={ProductBottomTab} />
        <Stack.Screen name='OrderRoot' component={OrderBottomTab} />
        <Stack.Screen name='PaymentRoot' component={PaymentBottomTab} />
        <Stack.Screen name='MainRoot' component={MainBottomTab} />
        <Stack.Screen
          name='BusinessNameScreen'
          component={BusinessNameScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default withTranslation()(Navigation);
