import { Text } from "@react-navigation/elements";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Animated, FlatList, Image, StyleSheet, View } from "react-native";
import { FAILED_TO_FETCH, USERS_ENDPOINT } from "../constants/StringConatants";
import { CircularIndicator } from "../components/CircularIndicatior";
import NetInfo from "@react-native-community/netinfo";
import { ThemeContext } from "../context/ThemeContext";
import messaging from '@react-native-firebase/messaging';
import useNotificationPermission from '../customHooks/useNotificationPermission';


export const HomeScreen = () => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { theme, mode } = useContext(ThemeContext)!;
    // const [imageError, setImageError] = useState(false);
    const { hasPermission } = useNotificationPermission();
    const [fcmToken, setFcmToken] = useState<string | null>(null);
    const [fadeAnim] = useState(new Animated.Value(0));
    if (!theme) {
        return null;
    }
    const fetchUsers = async () => {
        const state = await NetInfo.fetch();
        try {
            setLoading(true);
            setError(null);
            if (!state.isConnected) {
                Alert.alert("No internet connection. Please check your network.");
                return;
            }
            const response = await axios.get(USERS_ENDPOINT);
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
            setError(FAILED_TO_FETCH);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        const getToken = async () => {
            try {
                const token = await messaging().getToken();
                setFcmToken(token);
                console.log('FCM Token from HomeScreen:', token);
            } catch (error) {
                console.log('Failed to get FCM token in HomeScreen:', error);
            }
        };

        if (hasPermission) {
            getToken();
        }
        fetchUsers();
    }, [hasPermission])

    type ItemProps = {
        item: {
            id: number;
            name: string;
            email: string;
            address?: string;
            state?: string;
            phone?: string;
            photo?: string;
        };
    };

    const Item = ({ item }: ItemProps) => (
        <View style={[styles.userCard, { borderBottomColor: theme.borderBottomColor }]}>
            <Image style={[styles.userImage, { backgroundColor: mode === "dark" ? 'white' : 'black' }]}
                source={{ uri: item.photo }}
            />
            <View style={styles.itemTextContainer}>
                <Text style={[styles.username, { color: theme.text }]}>{item.name}</Text>
                <Text style={[styles.phone, { color: theme.text }]}>{item.email}</Text>
                <Text style={[styles.phone, { color: theme.text }]}>{item.state}</Text>
            </View>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            {loading ?
                (
                    <CircularIndicator />
                ) :
                error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) :
                    user.length > 0 ? (
                        <FlatList
                            data={user}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => <Item item={item} />}
                        />
                    ) : (
                        <Text style={styles.noDataText}>No users found.</Text>
                    )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
    noDataText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#777',
    },
    userCard: {
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    itemTextContainer: {
        paddingLeft: 5,
    },
    username: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000'
    },
    phone: {
        fontSize: 16,
        color: '#383837'
    },
    state: {
        fontSize: 13,
        color: '#383837',

    },
    userImage: {
        backgroundColor: 'black',
        margin: 8,
        width: 65,
        height: 65,
        borderRadius: 65 / 2
    },
});