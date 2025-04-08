import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'

interface Props{
  title : string,
  
}

const MyButton  = ({title , onPress}) => {
  return (
    <TouchableOpacity onPress = { onPress } style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

export default MyButton

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff0036",
    borderRadius: 30
  },
  title: {
    color: "white",
    fontSize: 18,
    fontFamily: "PTSerif-Bold"
  }
})