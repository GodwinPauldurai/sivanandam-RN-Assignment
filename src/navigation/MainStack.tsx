import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import MyTabs from './BottomNavigation';
import MyDrawer from './DrawerNavigation';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown : false}}>
      <Stack.Screen name="Mytab" component={MyTabs} />
    </Stack.Navigator>
  );
}
