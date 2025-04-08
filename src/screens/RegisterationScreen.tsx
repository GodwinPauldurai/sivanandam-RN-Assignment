// import { Text } from "@react-navigation/elements";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text, Platform, Alert } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MyButton from "../components/MyButton";
import MyTextInput from "../components/MyTextInput";
import SocialMedia from "../components/SocialMedia";
import { createUserWithEmailAndPassword, getAuth, setPersistence } from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import { getApp } from "@react-native-firebase/app";
import NetInfo from "@react-native-community/netinfo";

export const RegisterationScreen = ({ navigation }) => {

    const app = getApp();
    const auth = getAuth(app);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPasswordl] = useState("");

    const register = async () => {
        let emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (email == '' || password == '' || confirmPassword == '') {
            showToast('error', 'kindly fill all the details to proceed', '');
        } else if (emailRegx.test(email) === false) {
            showToast('error', 'Enter valid email', '');
        } else if (password !== confirmPassword) {
            showToast('error', 'Password and confirmPassword is not matched', '');
        } else {
            const state = await NetInfo.fetch();
            if (!state.isConnected) {
                Alert.alert("No internet connection. Please check your network.");
                return;
            }
            createUserWithEmailAndPassword(auth, email, password).then(() => {
                showToast('success', 'User created successfully', '');
                clearFields();
                navigation.navigate("Login");
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                clearFields();
                showToast('error', errorMessage, '');
            });
        }
    }
    const clearFields = () => {
        setEmail('');
        setPassword('');
        setconfirmPasswordl('');
    }

    const showToast = (type: string, description: string, subText: string) => {
        Toast.show({
            type: type, // 'success' | 'error' | 'info'
            text1: description,
            text2: subText,
            position: 'bottom',
            visibilityTime: 4000, // Auto hide after 3 sec
            autoHide: true
        });
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Text style={styles.txtWelcome}>Welcome</Text>
                <View style={styles.inputContainer}>
                    <MyTextInput value={email} onChangeText={(text: string) => setEmail(text)} placeholder="Email" />
                    <MyTextInput value={password} onChangeText={(text: string) => setPassword(text)} placeholder="Password" secureTextEntry={true} />
                    <MyTextInput value={confirmPassword} onChangeText={(text: string) => setconfirmPasswordl(text)} placeholder="Confirm Password" secureTextEntry={true} />
                    <View style={styles.registerButtonContainer}>
                        <MyButton title={"Register"} onPress={register} />
                    </View>
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
    registerButtonContainer: {
        marginTop: 20,
        width: "100%"
    },

})