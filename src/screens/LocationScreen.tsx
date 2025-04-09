import { Button, Text } from "@react-navigation/elements";
import React, { useEffect, useState } from "react";
import { Alert, PermissionsAndroid, Platform, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import Geolocation, { GeoPosition } from "react-native-geolocation-service";
import { CircularIndicator } from "../components/CircularIndicatior";
import MapView, { Marker } from "react-native-maps";

export const LocationScreen = () => {
    // const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [location, setLocation] = useState<GeoPosition | null>(null);
    const [loading, setLoading] = useState(true);

    // Request permisson 
    const requestPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Geolocation Permission',
                    message: 'Can we access your location?',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                console.warn("Location permission denied");
                setLoading(false);
                return false;
            }
        }
        return true;
    };

    // get current loacation
    const getCurrentLocation = async () => {

        try {
            const hasPermission = await requestPermission();
            if (!hasPermission) {
                setLoading(false);
                return;
            }

            Geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                    setLoading(false);
                },
                (error) => {
                    console.error("Error getting location: ", error);
                    setLoading(false);

                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        } catch (error) {
            console.error("Unexpected error:", error);
            setLoading(false);
        }

    };

    useEffect(() => {
        getCurrentLocation();
    }, []);


    // const getLocation = async () => {
    //     const hasPermission = await requestPermission();

    //     if (!hasPermission) {
    //         return;
    //     }
    //     Geolocation.getCurrentPosition(
    //         position => {
    //             setLocation(position);
    //             console.log(position);
    //         },
    //         error => {
    //             Alert.alert(`Code ${error.code}`, error.message);
    //             setLocation(null);
    //             console.log(error);
    //         },
    //         {
    //             accuracy: {
    //                 android: 'high',
    //                 ios: 'best',
    //             },
    //             timeout: 15000,
    //             maximumAge: 10000,
    //             distanceFilter: 0,
    //         },
    //     );
    // };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <MapView
                    style={styles.mapStyle}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        draggable
                        coordinate={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                        }}
                        onDragEnd={
                            // (e) => Alert.alert(JSON.stringify(e.nativeEvent.coordinate))
                            (e) => {
                                getCurrentLocation();
                                console.log(location?.coords.altitude, location?.coords.longitude);
                            }
                        }
                        title={'Test Marker'}
                        description={'This is a description of the marker'}
                    />
                </MapView>
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: { flex: 1 },
    mapStyle: { flex: 1 },
    buttonContainer: {
        position: "absolute",
        bottom: 30,
        alignSelf: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 10,
        borderRadius: 8,
    },
    button: {
        padding: 12,
        backgroundColor: "#007bff",
        borderRadius: 5
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold"
    }
});