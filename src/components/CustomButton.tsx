import { Text, ActivityIndicator, TouchableOpacity, StyleSheet, GestureResponderEvent } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CircularIndicator } from "./CircularIndicatior";

interface CustomButtonProps {
    title?: string;
    iconName?: string;
    onPress?: (event: GestureResponderEvent) => void;
    disabled?: boolean;
    loading?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
    title = "Button",
    iconName,
    onPress,
    disabled = false,
    loading = false,
}) => {
    return (
        <TouchableOpacity
            style={[styles.button, disabled ? styles.disabledButton : {}]}
            onPress={!disabled ? onPress : null}
            disabled={disabled}
        >
            {loading ? (
                <CircularIndicator />
            ) : (
                <>
                    <Icon name={iconName} size={24} color="white" />
                    <Text style={[styles.buttonText, { opacity: disabled ? 0.5 : 1 }]}>{title}</Text>
                </>
            )}
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
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
});