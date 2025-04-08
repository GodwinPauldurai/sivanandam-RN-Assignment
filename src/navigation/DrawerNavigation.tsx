import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingsScreen from '../screens/SettingsScreen';
import MyTabs from './BottomNavigation';
import CustomDrawerContent from '../components/CustomDrawerNavigation';
import ProfileScreen from '../screens/ProfileScreen';
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from 'react';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  const { theme, mode } = useContext(ThemeContext)!;
  
      if (!theme) {
          return null;
      }
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle : {
          backgroundColor: mode === "dark" ? 'black' : 'white'
        },
        headerStyle: {
          backgroundColor: '#6200ee',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Drawer.Screen name="MyTabs" component={MyTabs} options={{ title: "Home" }} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}