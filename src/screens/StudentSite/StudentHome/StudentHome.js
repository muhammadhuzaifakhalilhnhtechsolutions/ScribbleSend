import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { BG_COLOR, THEME_COLOR, THEME_COLOR_LIGHT } from '../../../utils/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { styles } from './HomeStyles';

const StudentHome = ({ navigation }) => {
  const [searches, setsearches] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setdate] = useState(moment().format('DD-MM-YYYY'));

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const formattedDate = moment(date).format('DD-MM-YYYY');
    setdate(() => formattedDate);
    hideDatePicker();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={BG_COLOR} />
      <KeyboardAvoidingView
        style={styles.main}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.userDiv}>
            <Text style={styles.usernames}>Hi Huzaifa</Text>
            <Text style={styles.userDetails}>Here is your activity today,</Text>
            <TouchableOpacity
              style={styles.notiDiv}
              onPress={() => navigation.navigate('StudentNotification')}>
              <Ionicons
                name="notifications-outline"
                size={26}
                color={THEME_COLOR}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputDiv}>
            <TextInput
              placeholder={'Search here...'}
              placeholderTextColor="#64748B"
              value={searches}
              onChangeText={setsearches}
              style={styles.input}
              cursorColor={THEME_COLOR}
              selectionColor={THEME_COLOR_LIGHT}
            />
            <TouchableOpacity
              style={styles.calenderBtn}
              onPress={showDatePicker}>
              <Ionicons name="calendar" size={24} color={THEME_COLOR} />
            </TouchableOpacity>
          </View>

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

          <View style={styles.BottomBox}>
            <Text style={styles.headingText}>Saved WorkSheets</Text>
            <TouchableOpacity
              style={styles.worksheetBtn}
              onPress={() => navigation.navigate('WhiteBoard')}>
              <Text numberOfLines={1} style={styles.worksheetText}>
                07-04-20 Pn Mariam Math Latihan Aisam Math Buku Teks ms 23-30
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.worksheetBtn}
              onPress={() => navigation.navigate('WhiteBoard')}>
              <Text numberOfLines={1} style={styles.worksheetText}>
                21-04-20 Pn Mariam Math Kuiz
              </Text>
            </TouchableOpacity>
          </View>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default StudentHome;
