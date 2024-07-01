import { StyleSheet, Text, View ,SafeAreaView, StatusBar} from 'react-native'
import React from 'react'
import { White } from '../../../utils/Color'

const Dasboard = () => {
  return (
    <SafeAreaView style={styles.Main}>
     <StatusBar backgroundColor={White} barStyle="dark-content" />
    </SafeAreaView>
  )
}

export default Dasboard

const styles = StyleSheet.create({
  Main:{
    flex:1,
    backgroundColor:White
  },
})