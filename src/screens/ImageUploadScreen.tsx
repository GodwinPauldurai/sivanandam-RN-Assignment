import React, { useContext, useState } from "react";
import { Alert, Image, Platform, View, Text, StyleSheet } from "react-native";
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { CustomButton } from "../components/CustomButton";
import axios from "axios";
import { MOCK_API_URL } from "../constants/StringConatants";
import { ThemeContext } from "../context/ThemeContext";

export const ImageUploadScreen = () => {

    const [imageUri, setImageUri] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const { theme, mode } = useContext(ThemeContext)!;

    if (!theme) {
        return null;
    }

    const requestCameraPermission = async () => {
        const permission = Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA;
        const result = await request(permission);
        return result === RESULTS.GRANTED;
    };

    const requestGalleryPermission = async () => {
        if (Platform.OS === 'android' && Platform.Version >= 33) {
            const result = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
            return result === RESULTS.GRANTED;
        }
        return true;
    };

    const selectImage = async (fromCamera = false) => {
        const hasPermision = fromCamera ? await requestCameraPermission() : await requestGalleryPermission;
        if (!hasPermision) {
            Alert.alert('Permission Denied', 'You need to grant camera permission.');
            return;
        }

        const options = {
            mediaType: 'photo' as const,
            quality: 1
        };
        const callback = (response) => {
            if (response.didCancel) return;
            if (response.error) {
                Alert.alert('Error', response.error);
                return;
            }
            if (response.assets && response.assets.length > 0) {
                setImageUri(response.assets[0].uri);
            }
        };
        fromCamera ? launchCamera(options, callback) : launchImageLibrary(options, callback);
    };

    const uploadImage = async () => {
        if (!imageUri) {
            Alert.alert('Please select an image first');
            return;
        }
        setUploading(true);
        setUploadSuccess(false);
        try {
            const response = await axios.post(MOCK_API_URL, { imageUrl: imageUri });
            
            if (response.status === 201) {
                Alert.alert('Upload Successful', 'Image URI uploaded to Mock API!', [{ 
                    text: 'OK',
                    onPress: () => setImageUri(null),
                }]);
                setUploadSuccess(true);
            } else {
                Alert.alert('Upload Failed', 'Something went wrong');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Upload Error', 'An error occurred while uploading');
        }
        setUploading(false);
    };

    return (
        <View style={[styles.container,{ backgroundColor: theme.background }]}>
            {imageUri && (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: imageUri }} style={styles.image} />
                </View>
            )}
            <CustomButton title="Pick from Gallery" iconName="image" onPress={() => selectImage(false)} />
            <CustomButton title="Capture from Camera" iconName="camera" onPress={() => selectImage(true)} />
            <CustomButton
                title={uploading ? "Uploading..." : "Upload Image"}
                iconName="upload"
                onPress={uploadImage}
                disabled={uploading || !imageUri}
                loading={uploading}
            />

            {/* {uploadSuccess && (
                <View style={styles.successMessage}>
                    <Icon name="check-circle" size={24} color="green" />
                    <Text style={styles.successText}>Image Uploaded Successfully!</Text>
                </View>
            )} */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#F5F5F5",
    },
    imageContainer: {
        width: 250,
        height: 250,
        borderRadius: 10,
        marginBottom: 20,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#6200ee",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 10,
        width: 250,
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    disabledButton: {
        backgroundColor: "#BDBDBD",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10,
    },
    successMessage: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#E8F5E9",
    },
    successText: {
        color: "green",
        marginLeft: 10,
        fontWeight: "bold",
    },
});