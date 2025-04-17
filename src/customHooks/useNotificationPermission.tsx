import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import messaging from '@react-native-firebase/messaging';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import {PermissionsAndroid} from 'react-native';

const useNotificationPermission = () => {

    const [hasPermission, setPermission] = useState<boolean>(false);

    const POST_NOTIFICATIONS: typeof PERMISSIONS.ANDROID.READ_SMS =
        (PERMISSIONS as any).ANDROID.POST_NOTIFICATIONS;


    const requestPermission = async () => {
        if (Platform.OS === 'ios') {
            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;
            setPermission(enabled);
        } else if (Platform.OS === 'android') {
            if (Platform.Version >= 33) {
                const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
                setPermission(result === RESULTS.GRANTED);
            } else {
                setPermission(true);
            }
        }
    };

    useEffect(() => {
        requestPermission();
    }, []);

    return { hasPermission, requestPermission };
};

export default useNotificationPermission

