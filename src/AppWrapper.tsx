// src/AppWrapper.tsx
import React, { useEffect, useRef, useState } from 'react';
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
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import useNotificationPermission from './customHooks/useNotificationPermission';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType,AndroidImportance, AndroidStyle } from '@notifee/react-native';
import { Alert, Animated } from 'react-native';

export default function AppWrapper() {
    const auth = getAuth();
    const dispatch = useDispatch();
    const [user, setUserState] = useState(null);
    const { hasPermission } = useNotificationPermission();
    const [fcmToken, setFcmToken] = useState<string | null>(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    
    useEffect(() => {
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();
      }, [user]);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: "265900627572-pe501oc1iltu6oi5qjn2bqhila9bnnhp.apps.googleusercontent.com",
            offlineAccess: false,
            forceCodeForRefreshToken: false,
            scopes: ['profile', 'email'],
        });

        const setupNotifee = async () => {
            await notifee.createChannel({
              id: 'default',
              name: 'Default Channel',
              importance: AndroidImportance.HIGH,
            });
          };
          const notifeeUnsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
            if (type === EventType.ACTION_PRESS) {
              const { pressAction, input } = detail;
              if (pressAction?.id === 'mark-read') {
                showToast('success','User tapped Mark as Read','');
              } else if (pressAction?.id === 'reply') {
                showToast('success',input,'');
              }
            }
          });

          messaging().requestPermission();

          const notificationUnsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('FCM Foreground Message:', remoteMessage);
      
            const { title, body } = remoteMessage.notification ?? {};
    
            await notifee.displayNotification({
              title: title ?? 'New Notification',
              body: body ?? '',
              android: {
                channelId: 'default',
                smallIcon: 'ic_stat_circle_notifications', // ← your custom drawable icon
                color: '#2196F3',
                pressAction: {
                  id: 'default',
                },
                style: {
                  type: AndroidStyle.BIGTEXT,
                  text: body ?? '',
                },
                actions: [
                    {
                      title: 'Mark as Read',
                      pressAction: {
                        id: 'mark-read',
                      },
                    },
                    {
                      title: 'Reply',
                      pressAction: {
                        id: 'reply',
                        launchActivity: 'default', 
                      },
                      input: {
                        allowFreeFormInput: true,
                        placeholder: 'Type your reply',
                      },
                    },
                  ],
              },
            });
          });



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

        const getToken = async () => {
            try {
                const token = await messaging().getToken();
                setFcmToken(token);
                console.log('FCM Token:', token);
            } catch (error) {
                console.log('Failed to get FCM token:', error);
            }
        };

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                setUserState(firebaseUser);
                AsyncStorage.setItem('userSession', JSON.stringify(firebaseUser.getIdToken));
                dispatch(
                    setUser({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email ?? '',
                        displayName: firebaseUser.displayName || '',
                    })
                );
                if (hasPermission) {
                    await getToken();
                }
            } else {
                setUserState(null);
                AsyncStorage.removeItem('userSession');
                dispatch(setUser(null));
            }
        });
        // const fcmUnsubscribe = messaging().onMessage(async remoteMessage => {
        //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        // });

        checkUserSession();
        setupNotifee();
        BootSplash.hide({ fade: true });

        return () => {
            unsubscribe();
            // fcmUnsubscribe();
            notificationUnsubscribe();
            notifeeUnsubscribe();
        };

    }, [hasPermission]);

    const showToast = (type: string, description: string, subText: string) => {
            Toast.show({
                type: type,
                text1: description,
                text2: subText,
                position: 'bottom',
                visibilityTime: 4000,
                autoHide: true
            });
        };

    return (
        <NavigationContainer>
            <OfflineBanner />
            <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            {user ? <MyDrawer /> : <AuthStack />}
            </Animated.View>
            <Toast />
        </NavigationContainer>
    );
}
