import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface UserAvatarProps {
  photoURL?: string;
  displayName?: string;
  size?: number;
}

export const Avatar: React.FC<UserAvatarProps> = ({ photoURL, displayName = "User", size = 80 }) => {
  return (
    <View style={[styles.avatarContainer, { width: size, height: size, borderRadius: size / 2 }]}>
      {photoURL ? (
        <Image source={{ uri: photoURL }} style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]} />
      ) : (
        <Text style={[styles.initials, { fontSize: size * 0.4 }]}>{displayName.charAt(0).toUpperCase()}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    resizeMode: "cover",
  },
  initials: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Avatar;
