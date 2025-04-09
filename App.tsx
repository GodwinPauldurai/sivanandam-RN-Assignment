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
import { useDispatch } from 'react-redux';
import { setUser } from "../MyApp/src/redux/slices/userSlice";
import AppWrapper from './src/AppWrapper';


export default function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <AppWrapper />
      </Provider>
    </ThemeProvider>
  );
}
