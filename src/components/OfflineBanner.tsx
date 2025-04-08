import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import NetInfo from "@react-native-community/netinfo";

const OfflineBanner = () => {
  const [isOffline, setIsOffline] = useState(false);
  const slideAnim = new Animated.Value(-30); // Start hidden

  useEffect(() => {
    const checkConnection = async () => {
      const state = await NetInfo.fetch();
      setIsOffline(!state.isConnected);
    };

    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected);
    });

    checkConnection(); // Check once on mount

    return () => unsubscribe();
  }, []);

  useEffect(() => {
   
    Animated.timing(slideAnim, {
      toValue: isOffline ? 0 : -30, 
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOffline]);

  if (!isOffline) return null; // Render only when offline

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
      <Text style={styles.text}> No Internet Connection</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "red",
    paddingVertical: 10,
    alignItems: "center",
    zIndex: 1000,
    elevation: 10,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default OfflineBanner;