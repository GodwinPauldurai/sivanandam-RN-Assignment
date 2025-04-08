import React, { useContext } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { ThemeContext } from "../context/ThemeContext";

export default function CustomDrawerContent(props) {

    const { theme, mode } = useContext(ThemeContext)!;
    if (!theme) {
        return null;
    }

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, }} >
            <TouchableOpacity onPress={() => props.navigation.navigate('MyTabs')} style={styles.menuContainer}>
                <View style={styles.menuItem}>
                    <Icon name={'home'} size={20} color = { mode === "dark" ? 'white' : "#6200ee" } style={styles.menuIcon} />
                    <Text style={[styles.menuText,{ color: theme.text }]}>Home</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate('Settings')} style={styles.menuContainer}>
                <View style={styles.menuItem}>
                    <Icon name={'settings'} size={20} color = { mode === "dark" ? 'white' : "#6200ee" } style={styles.menuIcon} />
                    <Text style={[styles.menuText,{ color: theme.text }]}>Settings</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate('Profile')} style={styles.menuContainer}>
                <View style={styles.menuItem}>
                    <AntDesignIcon name={'profile'} size={20} color = { mode === "dark" ? 'white' : "#6200ee" } style={styles.menuIcon} />
                    <Text style={[styles.menuText, { color: theme.text }]}>Profile</Text>
                </View>
            </TouchableOpacity>
        </DrawerContentScrollView>
    );
}


const styles = StyleSheet.create({
    menuContainer: {
        width: "100%",
        paddingTop: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#D4D4D4",
        alignItems: "baseline",
    },
    menuItem: { flexDirection: 'row', alignItems: 'center' },
    menuIcon: {
        paddingEnd: 10,
    },
    menuText: {
        fontSize: 20,
        color: '#6200ee',
        fontWeight: 'bold'
    },
});