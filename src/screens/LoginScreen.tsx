// import { Text } from "@react-navigation/elements";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text, Platform, Touchable, TouchableOpacity, Alert } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MyButton from "../components/MyButton";
import MyTextInput from "../components/MyTextInput";
import SocialMedia from "../components/SocialMedia";
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from "../redux/slices/userSlice";
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import { getApp } from "@react-native-firebase/app";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";
import { GoogleSignin } from '@react-native-google-signin/google-signin';


export const LoginScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState("siva1@gmail.com");
    const [password, setPassword] = useState("Siva@12345");
    const app = getApp();
    const auth = getAuth(app);


    const login = async () => {
        let emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (email == '' || password == '') {
            showToast('error', 'Username or Password should not be empty', '');
        } else if (emailRegx.test(email) === false) {
            showToast('error', 'Enter valid email', '');
        } else {
            const state = await NetInfo.fetch();
            if (!state.isConnected) {
                Alert.alert("No internet connection. Please check your network.");
                return;
            }
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const idToken = await userCredential.user.getIdToken();
                console.log("User signed in successfully.");
                console.log("USER ID Token:", idToken);
                dispatch(setUser({
                    uid: userCredential.user.uid,
                    email: userCredential.user.email ?? '',
                    displayName: userCredential.user.displayName || email,
                }));
            } catch (error: any) {
                const errorMessage = error.message;
                showToast('error', errorMessage, '');
            }
        }
    }

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
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Text style={styles.txtWelcome}>Welcome</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.textInputContainer}>
                        <MyTextInput placeholder="Email" value={email} onChangeText={(text: string) => setEmail(text)} />
                    </View>
                    <View style={styles.textInputContainer}>
                        <MyTextInput placeholder="Password" value={password} onChangeText={(text: string) => setPassword(text)} secureTextEntry={true} />
                    </View>
                    <TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={() => [navigation.navigate("Register")]}>
                        <Text style={styles.txtRegisterHere}> Don't have an account? Sign up here. </Text>
                    </TouchableOpacity>
                    <MyButton title={"Login"} onPress={login} />
                    <Text style={styles.txtOr}> OR </Text>
                    <View style={styles.socialMediaComp}>
                        <SocialMedia />
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "red",
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
    },
    txtWelcome: {
        color: 'white',
        fontSize: 40,
        marginTop: Platform.OS === 'ios' ? "20%" : "30%",
        fontFamily: 'PTSerif-Regular'

    },
    inputContainer: {
        backgroundColor: "white",
        marginTop: 30,
        borderRadius: 20,
        width: "93%",
        justifyContent: "center",
        alignItems: "center",
        height: 430,
        flexDirection: "column",
        paddingHorizontal: 20
    },
    textInputContainer: {
        flexDirection: "row",
        alignItems: 'center'
    },
    txtRegisterHere: {
        marginTop: 20,
        marginBottom: 20,
        alignSelf: "flex-end"
    },
    txtOr: {
        marginTop: 20,
        color: "gray"
    },
    socialMediaComp: {
        alignSelf: "center",
        justifyContent: "center",
        paddingTop: 20
    },

})