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
import PDFViewer from '../../../components/PDFViewer/PDFViewer';
import Header from '../../../components/Header/Header';
import { PopingBold } from '../../../utils/Fonts';
import Input from '../../../components/TextInput/Input';
import Button from '../../../components/Button/Button';

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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
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
  },
  headingText: {
    fontSize: 16,
    color: '#64748B',
    fontFamily: PopingBold,
    textAlign: 'center',
  },
  input: {
    textAlignVertical: 'top',
    width: '100%',
  },
});
