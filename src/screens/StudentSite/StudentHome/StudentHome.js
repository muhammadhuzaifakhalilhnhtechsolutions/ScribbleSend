import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  BG_COLOR,
  Gray,
  THEME_COLOR,
  THEME_COLOR_LIGHT,
  White,
} from '../../../utils/Color';
import Input from '../../../components/TextInput/Input';
import Header from '../../../components/Header/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PopingBold, PoppinsRegular } from '../../../utils/Fonts';

const StudentHome = () => {
  const [searches, setsearches] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={BG_COLOR} />
      <KeyboardAvoidingView
        style={styles.main}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
          <View style={styles.userDiv}>
            <Text style={styles.usernames}>Hi Huzaifa</Text>
            <Text style={styles.userDetails}>Here is your activity today,</Text>
            <TouchableOpacity style={styles.notiDiv}>
              <Ionicons name="notifications-outline" size={26} color={Gray} />
            </TouchableOpacity>
          </View>
          <Input
            placeholder={'Search here...'}
            placeholderTextColor="#64748B"
            value={searches}
            style={{ backgroundColor: 'white' }}
            onChangeText={setsearches}
          />

          <View style={styles.divBox}>
            <View style={styles.divBox1}>
              <View style={styles.divBox2}>
                <Text style={{ ...styles.text1, color: '#B4530A' }}>89%</Text>
                <Text style={styles.text2}>Presence</Text>
              </View>
              <View style={styles.divBox2}>
                <Text style={{ ...styles.text1, color: '#4078D3' }}>77%</Text>
                <Text style={styles.text2}>Completeness</Text>
              </View>
            </View>
            <View style={styles.divBox1}>
              <View style={styles.divBox2}>
                <Text style={{ ...styles.text1, color: '#52B6DF' }}>18</Text>
                <Text style={styles.text2}>Assignments</Text>
              </View>
              <View style={styles.divBox2}>
                <Text style={{ ...styles.text1, color: '#F59E0C' }}>12</Text>
                <Text style={styles.text2}>Not Attend</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default StudentHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    width: '100%',
  },
  main: {
    flex: 1,
    width: '100%',
  },
  userDiv: {
    padding: 16,
    width: '100%',
  },
  usernames: {
    fontSize: 18,
    color: THEME_COLOR,
    fontFamily: PopingBold,
  },
  userDetails: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: PoppinsRegular,
  },
  notiDiv: {
    width: 40,
    height: 40,
    backgroundColor: `rgba(209, 227, 255,0.6)`,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    top: '40%',
  },
  divBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 10,
  },
  divBox1: {
    width: '96%',
    alignSelf: 'center',
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divBox2: {
    backgroundColor: White,
    width: '48%',
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 20,
  },
  text1: {
    fontSize: 20,
    color: THEME_COLOR,
    fontFamily: PopingBold,
  },
  text2: {
    fontSize: 14,
    color: '#64748B',
    fontFamily: PopingBold,
  },
});
