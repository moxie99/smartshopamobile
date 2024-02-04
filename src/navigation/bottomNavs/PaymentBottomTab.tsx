import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PaymentRootTabParamList, StackParamsList } from '../types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { palette } from '../../constants/theme';
import AddProducts from '../../screens/AddProducts';
import DiscountProduct from '../../screens/DiscountProduct';
import AllProducts from '../../screens/AllProducts';
import ProductHome from '../../screens/ProductHome';
import OrderHome from '../../screens/OrderHome';
import CancelledOrders from '../../screens/CancelledOrders';
import OngoingOrders from '../../screens/OngoingOrders';
import PendingOrders from '../../screens/PendingOrders';
import PaymentHome from '../../screens/PaymentHome';
import RequestPayment from '../../screens/RequestPayment';
import SuccessfulPayment from '../../screens/SuccessfulPayment';
import Account from '../../screens/Account';
const BottomTab = createBottomTabNavigator<PaymentRootTabParamList>();

export const PaymentBottomTab = () => {
  return (
    <BottomTab.Navigator
      initialRouteName='PaymentHome'
      screenOptions={{
        tabBarActiveTintColor: palette.success2,
      }}
    >
      <BottomTab.Screen
        name='PaymentHome'
        component={PaymentHome}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />,
        }}
      />
      <BottomTab.Screen
        name='RequestPayment'
        component={RequestPayment}
        options={{
          headerShown: false,
          tabBarLabel: 'Request',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='cash-refund' color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='SuccessfulPayment'
        component={SuccessfulPayment}
        options={{
          headerShown: false,
          tabBarLabel: 'Success',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='cash-plus' color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='Account'
        component={Account}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='account-circle-outline' color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
}) {
  return (
    <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} {...props} />
  );
}
