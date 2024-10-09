import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Keyboard,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  BG_COLOR,
  THEME_COLOR,
  THEME_COLOR_LIGHT,
  White,
} from '../../../utils/Color';
import Header from '../../../components/Header/Header';
import { PopingBold } from '../../../utils/Fonts';
import Input from '../../../components/TextInput/Input';
import Button from '../../../components/Button/Button';
import VideoPlayer from 'react-native-video';
import TeacherBoard from '../../../components/TeacherBoard/TeacherBoard';

const { height } = Dimensions.get('screen');

const ViewAssessment = ({ navigation }) => {
  const [remarks, setRemarks] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(() => true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(() => false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={THEME_COLOR} barStyle="light-content" />
      <Header
        title="Student Assessment"
        icon={true}
        onPress={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {/* <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
          <View style={styles.pdfViewSec}>
            <PDFViewer
              pdfUrl={
                'https://familyhandbook.s3-accelerate.amazonaws.com/pdf/final_pdf/combined_document_msNeXAE.pdf'
              }
            />
          </View>
          <View style={styles.remarksDiv}>
            <Text style={styles.headingText}>Teacher Remarks</Text>
            <Input
              placeholder="Remarks"
              value={remarks}
              onChangeText={setRemarks}
              numberOfLines={4}
              multiline={true}
              style={styles.input}
              cursorColor={THEME_COLOR}
              selectionColor={THEME_COLOR_LIGHT}
            />
          </View>
          <Button
            title={remarks.trim() === '' ? 'Save' : 'Upload'}
            style={{ margin: 10 }}
          />
        </ScrollView> */}

        <ScrollView showsVerticalScrollIndicator={true} nestedScrollEnabled sc>
          <VideoPlayer
            style={{ height: height - 200, width: '100%', marginVertical: 5 }}
            source={{
              uri: 'https://cdn.pixabay.com/video/2023/01/25/147898-792811387_large.mp4',
            }}
            controls={true}
            resizeMode="contain"
            controlsStyles={{
              hideForward: false,
              hidePrevious: true,
              hideNext: true,
              hideDuration: false,
              hidePosition: true,
              hideNavigationBarOnFullScreenMode: true,
              hideNotificationBarOnFullScreenMode: true,
              hideFullscreen: false,
              seekIncrementMS: 1000,
            }}
            filter="CIColorInvert"
          />
          <TeacherBoard navigation={navigation} />

          <View style={styles.remarksDiv}>
            <Text style={styles.headingText}>Student Marks</Text>
            <Input
              placeholder="Marks"
              value={remarks}
              onChangeText={setRemarks}
              style={styles.input}
              cursorColor={THEME_COLOR}
              selectionColor={THEME_COLOR_LIGHT}
              keyboardType={'decimal-pad'}
              maxLength={3}
            />
          </View>
          <Button
            title={'Submit'}
            style={{
              margin: 10,
              backgroundColor: remarks.trim() === '' ? 'gray' : THEME_COLOR,
            }}
            disabled={remarks.trim() === '' ? true : false}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ViewAssessment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    width: '100%',
  },
  pdfViewSec: {
    width: '96%',
    alignSelf: 'center',
    height: height * 0.63,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
  },
  remarksDiv: {
    backgroundColor: White,
    padding: 6,
    width: '96%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 5,
  },
  headingText: {
    fontSize: 16,
    color: '#64748B',
    fontFamily: PopingBold,
    textAlign: 'center',
  },
  input: {
    textAlignVertical: 'center',
    width: '100%',
  },
});
