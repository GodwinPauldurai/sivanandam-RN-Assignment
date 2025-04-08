import { createStackNavigator } from '@react-navigation/stack';
import { RegisterationScreen } from '../screens/RegisterationScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName = "Login" screenOptions={{headerShown : false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterationScreen} />
    </Stack.Navigator>
  );
}
