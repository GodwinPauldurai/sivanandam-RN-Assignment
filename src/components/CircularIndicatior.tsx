import React, { FC } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'


export const CircularIndicator = () => {
    return(
    <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="blue" />
    </View>
    )
}

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})