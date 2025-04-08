import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Avatar from '../components/Avatar';
import Icon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { getAuth } from '@react-native-firebase/auth';



const ProfileScreen = () => {
    const insets = useSafeAreaInsets();

    const user = useSelector((state: RootState) => state.user.user);

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
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: insets.top ,backgroundColor : 'white'}}>
            <View style={styles.container}>
                <Avatar size={100} />
                <Text style={styles.userNameStyle}> Sivanandam</Text>
            </View>
            <View>
                <View style={styles.menuContaier}>
                    <Icon name={'settings'} size={20} color="black"  />
                    <Text style={styles.menuItemText}>Settings</Text>
                </View>
            </View>

            <View>
                <TouchableOpacity onPress={handleLogout}>
                <View style={styles.menuContaier}>
                    <AntIcon name={'logout'} size={20} color="black" />
                    <Text style={styles.menuItemText}>Logout</Text>
                </View>
                </TouchableOpacity>
            </View>
            {/* <View>
                <View style={styles.menuContaier}>
                    <Icon name={'settings'} size={20} color="black" />
                    <Text style={styles.menuItemText}>MenuItem</Text>
                </View>
            </View>
            <View>
                <View style={styles.menuContaier}>
                    <Icon name={'settings'} size={20}></Icon>
                    <Text style={styles.menuItemText}>MenuItem</Text>
                </View>
            </View> */}
        </ScrollView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({

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
        borderBottomWidth:1,
        borderBottomColor:"black"
    },
    menuItemText: {
        fontWeight: 'bold',
        fontSize: 18,
    }
})