import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import {
  BG_COLOR,
  Black,
  LightGrey,
  THEME_COLOR,
  White,
} from '../../../utils/Color';
import Header from '../../../components/Header/Header';
import Input from '../../../components/TextInput/Input';
import { PopingBold, PoppinsRegular } from '../../../utils/Fonts';
import Button from '../../../components/Button/Button';
import { showMessage } from 'react-native-flash-message';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const AddAssessment = ({ navigation }) => {
  const [heading, setheading] = useState('');
  const [des, setdes] = useState('');
  const [attachments, setattachments] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setdate] = useState(moment().format('YYYY-MM-DD'));

  // const handlePick = async () => {
  //   try {
  //     const [pickResult] = await pick();
  //     console.log('pickResult===>', pickResult);
  //     setattachments(pickResult);
  //   } catch (err) {
  //     console.log('err picker==>', err);
  //   }
  // };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setdate(() => formattedDate);
    hideDatePicker();
  };

  const handleNext = () => {
    if (heading.trim() && des.trim() !== '') {
      navigation.navigate('AddQuestions', {
        heading,
        des,
        date,
      });
    } else {
      showMessage({
        message: 'Warning',
        description: 'Please fill all fields ⚠️',
        type: 'warning',
        floating: true,
        animated: true,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={THEME_COLOR} />
      <Header
        icon={true}
        title={'Add Assessment'}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.main}>
        <View style={styles.inputCon}>
          <Text style={styles.inputHeadingText}>Heading</Text>
          <Input
            value={heading}
            onChangeText={setheading}
            placeholder="Assessment Heading"
            style={styles.input}
            placeholderTextColor="gray"
          />
        </View>
        <View style={styles.inputCon}>
          <Text style={styles.inputHeadingText}>Description</Text>
          <Input
            value={des}
            onChangeText={setdes}
            placeholder="Assessment Description"
            style={styles.input}
            placeholderTextColor="gray"
          />
        </View>
        <View style={styles.inputCon}>
          <Text style={styles.inputHeadingText}>Deadline</Text>
          <TouchableOpacity
            style={styles.calenderBtn}
            onPress={() => setDatePickerVisibility(true)}>
            <Text style={styles.input}>
              {moment(date).format('DD/MM/YYYY')}
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.inputCon}>
          <Text style={styles.inputHeadingText}>Attachments</Text>
          <TouchableOpacity style={styles.attachments} onPress={handlePick}>
            <Text style={styles.attachmentText}>
              {attachments?.name ? attachments?.name : 'Assessment Attachments'}
            </Text>
            <Ionicons
              name="attach"
              size={26}
              color={THEME_COLOR}
              style={{ right: 10 }}
            />
          </TouchableOpacity>
        </View> */}

        <Button
          title={'Next'}
          style={[
            styles.btn,
            {
              backgroundColor:
                heading.trim && des.trim() == '' ? 'gray' : THEME_COLOR,
            },
          ]}
          onPress={handleNext}
          disabled={heading.trim && des.trim() == '' ? true : false}
        />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddAssessment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    width: '100%',
  },
  main: {
    flex: 1,
    width: '96%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  inputCon: {
    marginVertical: 2,
    backgroundColor: White,
    padding: 4,
    borderRadius: 10,
  },
  inputHeadingText: {
    color: Black,
    fontSize: 16,
    fontFamily: PopingBold,
    left: 10,
  },
  input: {
    fontSize: 14,
    fontFamily: PoppinsRegular,
    color: Black,
  },
  btn: {
    marginTop: 20,
    width: '40%',
    alignSelf: 'center',
  },
  attachments: {
    backgroundColor: LightGrey,
    width: '96%',
    alignSelf: 'center',
    borderRadius: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginVertical: 10,
    // alignItems: 'flex-end',
  },
  attachmentText: {
    fontSize: 14,
    color: 'gray',
    fontFamily: PoppinsRegular,
    width: '88%',
  },
  calenderBtn: {
    backgroundColor: LightGrey,
    width: '96%',
    alignSelf: 'center',
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 14,
    color: Black,
    fontFamily: PoppinsRegular,
    paddingVertical: 14,
    marginVertical: 10,
  },
});
