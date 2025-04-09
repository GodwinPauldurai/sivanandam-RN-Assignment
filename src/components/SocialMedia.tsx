import { Image, Platform, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import GoogleSignInButton from './GoogleSignInButton'
import { GoogleSignin, isErrorWithCode, isSuccessResponse, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';


const SocialMedia = () => {

    async function onGoogleButtonPress() {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            const signInResult = await GoogleSignin.signIn();
            console.log('Google SignIn Result:', signInResult);

            const idToken = signInResult.idToken;
            if (!idToken) {
                throw new Error('No ID token returned');
            }

            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            const firebaseUser = await auth().signInWithCredential(googleCredential);

            console.log('Firebase user:', firebaseUser.user);
            return firebaseUser;
        } catch (error: any) {
            console.error('Sign-In Error:', JSON.stringify(error, null, 2));
        }
    }

    return (
        <View style={styles.container}>

            <GoogleSignInButton onPress={async () => {
                try {
                    await onGoogleButtonPress();
                    // console.log('Signed in with Google!');
                } catch (error) {
                    console.error('Google Sign-In Error:', error);
                }
            }} />
            {/* <TouchableOpacity onPress={googleLogin}>
                <Image style={styles.icGoogle}
                    source={require("/Users/sivanandamr/Rnprojects/MyApp/assets/socialMediaIcons/ic_google.png")}
                />
            </TouchableOpacity> */}

            {Platform.OS === 'ios' && (
                <Image
                    style={styles.icApple}
                    source={require("/Users/sivanandamr/Rnprojects/MyApp/assets/socialMediaIcons/ic_apple.png")}
                />
            )}

        </View>
    )
}

export default SocialMedia

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center"
    },
    icApple: {
        width: 60,
        height: 60,
        marginLeft: 25,
        resizeMode: "stretch",
    },
    icGoogle: {
        width: 52,
        height: 50,
        resizeMode: "stretch",
    },
})