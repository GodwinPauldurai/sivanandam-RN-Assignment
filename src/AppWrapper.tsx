// src/AppWrapper.tsx
import React, { useEffect, useState } from 'react';
import BootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import AuthStack from './navigation/StackNavigation';
import MyDrawer from './navigation/DrawerNavigation';
import OfflineBanner from './components/OfflineBanner';
import { setUser } from './redux/slices/userSlice';

export default function AppWrapper() {
    const auth = getAuth();
    const dispatch = useDispatch();
    const [user, setUserState] = useState(null);

    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('userSession');
                if (storedUser) {
                    const parsed = JSON.parse(storedUser);
                    setUserState(parsed);
                    dispatch(
                        setUser({
                            uid: parsed.uid,
                            email: parsed.email ?? '',
                            displayName: parsed.displayName || '',
                        })
                    );
                }
            } catch (error) {
                console.error('Error retrieving user session:', error);
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUserState(firebaseUser);
                AsyncStorage.setItem('userSession', JSON.stringify(firebaseUser));
                dispatch(
                    setUser({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email ?? '',
                        displayName: firebaseUser.displayName || '',
                    })
                );
            } else {
                setUserState(null);
                AsyncStorage.removeItem('userSession');
                dispatch(setUser(null));
            }
        });

        checkUserSession();
        BootSplash.hide({ fade: true });

        return unsubscribe;
    }, []);

    return (
        <NavigationContainer>
            <OfflineBanner />
            {user ? <MyDrawer /> : <AuthStack />}
            <Toast />
        </NavigationContainer>
    );
}
