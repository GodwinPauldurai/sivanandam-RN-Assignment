import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Avatar from '../components/Avatar';
import Icon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { getAuth } from '@react-native-firebase/auth';
import { ThemeContext } from "../context/ThemeContext";



const ProfileScreen = ({ navigation }) => {

    const insets = useSafeAreaInsets();
    const user = useSelector((state: RootState) => state.user.user);
    console.log("User from Redux:", user);
    const { theme, mode } = useContext(ThemeContext)!;

    const handleLogout = () => {
        Alert.alert(
            "Log out",
            "Are you sure you want to log out?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Logout canceled"),
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => logout(),
                }
            ]
        );
    };

    const logout = async () => {
        const auth = getAuth();
        await auth.signOut();
    };

    return (
        <ScrollView contentContainerStyle={[
            styles.Scrollontainer,
            { paddingTop: insets.top, backgroundColor: mode === "dark" ? 'black' : 'white'  }
        ]}>
            <View style={styles.container}>
                <Avatar size={100} displayName={user?.email} />
                <Text style={[styles.userNameStyle,{ color: theme.text }]}> {user?.email}</Text>
            </View>
            <View>
                <TouchableOpacity onPress={() => [navigation.navigate("Settings")]}>
                    <View style={styles.menuContaier}>
                        <Icon name={'settings'} size={20} color={ mode === "dark" ? 'white' : "black" }/>
                        <Text style={[styles.menuItemText,{ color: theme.text }]}>Settings</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity onPress={handleLogout}>
                    <View style={styles.menuContaier}>
                        <AntIcon name={'logout'} size={20} color={ mode === "dark" ? 'white' : "black" } />
                        <Text style={[styles.menuItemText,{ color: theme.text }]}>Logout</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    Scrollontainer: {
        flexGrow: 1,
    },
    container: {
        alignItems: 'center',
        paddingTop: '10%',
    },
    userNameStyle: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: '2%'
    },
    menuContaier: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        gap: 10,
        borderColor: "#F1F1F1",
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "black"
    },
    menuItemText: {
        fontWeight: 'bold',
        fontSize: 18,
    }
})