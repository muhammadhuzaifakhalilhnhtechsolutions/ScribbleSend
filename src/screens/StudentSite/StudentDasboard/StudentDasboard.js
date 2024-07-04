import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import React from 'react';
import { Black, ThemoColor, White } from '../../../utils/Color';

const StudentDasboard = () => {
  return (
    <SafeAreaView style={styles.Main}>
      <StatusBar backgroundColor={ThemoColor} hidden={false} />
      <StatusBar backgroundColor={White} barStyle="dark-content" />
      <Text style={styles.text}>Wellcome To Dashboard</Text>
    </SafeAreaView>
  );
};

export default StudentDasboard;

const styles = StyleSheet.create({
  Main: {
    flex: 1,
    backgroundColor: White,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Black,
    fontSize: 15,
  },
});
