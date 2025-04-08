import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";


interface Props {
    onPress: () => void;
  }


const GoogleSignInButton : React.FC<Props> = ( {onPress}) => {
    
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Image
          source={require("/Users/sivanandamr/Rnprojects/MyApp/assets/socialMediaIcons/ic_google.png")} 
          style={styles.icon}
        />
      </View>
      <Text style={styles.text}>Sign in with Google</Text>
    </TouchableOpacity>
  );
};

export default GoogleSignInButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4285F4",
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 260,
    elevation: 2,
  },
  iconContainer: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 2,
    marginRight: 10,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});