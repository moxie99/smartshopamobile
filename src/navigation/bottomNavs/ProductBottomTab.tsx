import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProductRootTabParamList, StackParamsList } from '../types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { palette } from '../../constants/theme';
import AddProducts from '../../screens/AddProducts';
import DiscountProduct from '../../screens/DiscountProduct';
import AllProducts from '../../screens/AllProducts';
import ProductHome from '../../screens/ProductHome';
const BottomTab = createBottomTabNavigator<ProductRootTabParamList>();

export const ProductBottomTab = () => {
  return (
    <BottomTab.Navigator
      initialRouteName='ProductHome'
      screenOptions={{
        tabBarActiveTintColor: palette.success2,
      }}
    >
      <BottomTab.Screen
        name='ProductHome'
        component={ProductHome}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />,
        }}
      />
      <BottomTab.Screen
        name='AddProducts'
        component={AddProducts}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='tray-plus' color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='AllProducts'
        component={AllProducts}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='view-grid' color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='DiscountProduct'
        component={DiscountProduct}
        options={{
          headerShown: false,
          tabBarLabel: 'Discount Product',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='store-minus' color={color} />
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
