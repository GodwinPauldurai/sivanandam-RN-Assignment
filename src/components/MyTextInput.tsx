import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const MyTextInput = ({...props}) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                {...props}
            />
        </View>
    )
}

export default MyTextInput

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: "100%",
       justifyContent:"center"
    },
    input: {
        height: 50,
        width: "100%",
        borderBottomColor: "black",
        borderBottomWidth: 1
    },  
})