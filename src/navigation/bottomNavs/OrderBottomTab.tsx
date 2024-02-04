import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { OrderRootTabParamList, StackParamsList } from '../types';
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
import SuccessfulOrders from '../../screens/SuccessfulOrders';
const BottomTab = createBottomTabNavigator<OrderRootTabParamList>();

export const OrderBottomTab = () => {
  return (
    <BottomTab.Navigator
      initialRouteName='OrderHome'
      screenOptions={{
        tabBarActiveTintColor: palette.success2,
      }}
    >
      <BottomTab.Screen
        name='OrderHome'
        component={OrderHome}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />,
        }}
      />
      <BottomTab.Screen
        name='SuccessfulOrders'
        component={SuccessfulOrders}
        options={{
          headerShown: false,
          tabBarLabel: 'Success',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='inbox-full' color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='CancelledOrders'
        component={CancelledOrders}
        options={{
          headerShown: false,
          tabBarLabel: 'Cancelled',
          tabBarIcon: ({ color }) => <TabBarIcon name='cancel' color={color} />,
        }}
      />
      <BottomTab.Screen
        name='OngoingOrders'
        component={OngoingOrders}
        options={{
          headerShown: false,
          tabBarLabel: 'Ongoing',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='account-convert' color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='PendingOrders'
        component={PendingOrders}
        options={{
          headerShown: false,
          tabBarLabel: 'Pending',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='lan-pending' color={color} />
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
