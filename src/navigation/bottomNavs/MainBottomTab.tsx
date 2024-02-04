import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  MainRootTabParamList,
  ProductRootTabParamList,
  StackParamsList,
} from '../types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { palette } from '../../constants/theme';
import AddProducts from '../../screens/AddProducts';
import DiscountProduct from '../../screens/DiscountProduct';
import AllProducts from '../../screens/AllProducts';
import ProductHome from '../../screens/ProductHome';
import MainBoard from '../../screens/MainBoard';
import ChatScreen from '../../screens/ChatScreen';
const BottomTab = createBottomTabNavigator<MainRootTabParamList>();

export const MainBottomTab = () => {
  return (
    <BottomTab.Navigator
      initialRouteName='Dashboard'
      screenOptions={{
        tabBarActiveTintColor: palette.success2,
      }}
    >
      <BottomTab.Screen
        name='Dashboard'
        component={MainBoard}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />,
        }}
      />
      <BottomTab.Screen
        name='Chat'
        component={ChatScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='chat-processing-outline' color={color} />
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
