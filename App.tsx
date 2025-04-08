/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import './gesture-handler';
import React, { useState } from 'react';
import { useEffect } from "react";
import BootSplash from "react-native-bootsplash";
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AuthStack from './src/navigation/StackNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import MyDrawer from './src/navigation/DrawerNavigation';
import { store } from './src/redux/store/store';
import { Provider } from 'react-redux';
import OfflineBanner from './src/components/OfflineBanner';
import { ThemeProvider } from './src/context/ThemeContext';


export default function App() {
  const auth = getAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("userSession");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error retrieving user session:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        AsyncStorage.setItem("userSession", JSON.stringify(firebaseUser));
      } else {
        setUser(null);
        AsyncStorage.removeItem("userSession");
      }
    });
    checkUserSession();
    BootSplash.hide({ fade: true });
    return unsubscribe;
  }, []);

  return (
    <ThemeProvider>
      <Provider store={store}>
        <NavigationContainer >
          <OfflineBanner />
          {user ? <MyDrawer /> : <AuthStack />}
          <Toast />
        </NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
}
