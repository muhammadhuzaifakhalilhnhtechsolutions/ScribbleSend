import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { BG_COLOR, Black, THEME_COLOR, White } from '../../../utils/Color';
import Header from '../../../components/Header/Header';
import Input from '../../../components/TextInput/Input';
import { PopingBold } from '../../../utils/Fonts';
import Button from '../../../components/Button/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAvoidingView } from 'react-native';
import { PostApiCreate } from '../../../api/helper';
import { BaseUrl } from '../../../api/BaseUrl';
import { useSelector } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import Loader from '../../../components/Loader/Loader';
import { showMessage } from 'react-native-flash-message';

const AddQuestions = ({ navigation, route }) => {
  const [updateState, setUpdateState] = useState(0);
  const userData = useSelector(state => state.userReducer.user.data);
  const [isLoading, setisLoading] = useState(false);
  const data = route.params;

  const [items, setItems] = useState([
    {
      question: '',
      questionComments: '',
    },
  ]);

  const addItem = () => {
    setItems([
      ...items,
      {
        question: '',
        questionComments: '',
      },
    ]);
  };

  const handleSubmit = () => {
    setisLoading(true);
    const formdata = new FormData();
    formdata.append('heading', data?.heading);
    formdata.append('description', data?.des);
    items.map((v, i) => {
      formdata.append(`questions[${i}][question_text]`, v.question);
      formdata.append(`questions[${i}][comment_text]`, v.questionComments);
    });

    PostApiCreate(
      `${BaseUrl}/api/teacher/assessment/store`,
      formdata,
      userData?.token,
    )
      .then(res => {
        console.log('response add assessement===>', res.data);
        if (res.data?.status) {
          setisLoading(false);
          navigation.navigate('Dashboard');
          showMessage({
            message: 'Success',
            description: 'Assessment Added Successfully',
            type: 'success',
            floating: true,
            animated: true,
          });
        } else {
          setisLoading(false);
        }
      })
      .catch(error => {
        console.log('error add assessement===>', error);
        setisLoading(false);
        // const errorKeys = error && Object.keys(error?.response?.data?.errors);

        // if (errorKeys?.length > 0) {
        //   errorKeys.forEach(key => {
        //     error?.response?.data?.errors[key]?.forEach(errorMsg => {
        //       showMessage({
        //         message: 'Failed',
        //         description: errorMsg,
        //         type: 'danger',
        //         animated: true,
        //         floating: true,
        //       });
        //     });
        //   });
        // }
      });
  };

  // console.log('data', userData);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={THEME_COLOR} />
      {isLoading && <Loader />}
      <Header
        icon={true}
        title={'Add Questions'}
        onPress={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.topDiscriptions}>
            <View style={styles.personAddDiv}>
              <Text style={styles.heading}>Add Questions</Text>
              <TouchableOpacity style={styles.addBtnBox} onPress={addItem}>
                <Text style={styles.addText}>+</Text>
              </TouchableOpacity>
            </View>
            {items.map((item, index) => {
              return (
                <View key={index}>
                  {items.length !== 1 && (
                    <TouchableOpacity
                      onPress={() => {
                        items.splice(index, 1);
                        setItems(items);
                        setTimeout(() => {
                          setUpdateState(updateState + 1);
                        }, 100);
                      }}
                      style={{
                        backgroundColor: 'red',
                        height: 40,
                        width: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'flex-end',
                        borderRadius: 360,
                      }}>
                      <Ionicons name="trash" color={White} size={20} />
                    </TouchableOpacity>
                  )}
                  <View style={styles.centerDiv2}>
                    <Text style={styles.subText2}>Ask Quesstion ?</Text>
                    <Input
                      placeholder="Ask Quesstion"
                      placeholderTextColor={'gray'}
                      style={styles.input}
                      value={item.question}
                      multiline={true}
                      onChangeText={text => {
                        const updatedItems = [...items];
                        updatedItems[index].question = text;
                        setItems(updatedItems);
                      }}
                    />
                  </View>
                  <View style={styles.centerDiv2}>
                    <Text style={styles.subText2}>Quesstion Comments:</Text>
                    <Input
                      placeholder="Question comment"
                      placeholderTextColor={'gray'}
                      style={styles.input}
                      value={item.questionComments}
                      multiline={true}
                      onChangeText={text => {
                        const updatedItems = [...items];
                        updatedItems[index].questionComments = text;
                        setItems(updatedItems);
                      }}
                    />
                  </View>

                  {items.length !== 1 && <View style={styles.divider} />}
                </View>
              );
            })}
          </View>
          <Button
            title="Upload"
            style={styles.btnStyle}
            onPress={handleSubmit}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddQuestions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    width: '100%',
  },
  main: {
    flex: 1,
  },
  heading: {
    fontFamily: PopingBold,
    color: Black,
    fontSize: 20,
  },
  topDiscriptions: {
    width: '96%',
    backgroundColor: White,
    borderRadius: 20,
    alignSelf: 'center',
    padding: 14,
    marginVertical: 6,
  },
  subText2: {
    color: Black,
    fontSize: 16,
    fontFamily: PopingBold,
    width: '100%',
  },
  centerDiv2: {
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  input: {
    width: '100%',
    color: Black,
    fontSize: 14,
    textAlignVertical: 'top',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: Black,
    marginVertical: 20,
  },
  personAddDiv: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addBtnBox: {
    height: 35,
    width: 35,
    backgroundColor: THEME_COLOR,
    borderRadius: 360,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    fontSize: 22,
    color: White,
    fontFamily: PopingBold,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  btnStyle: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
});
