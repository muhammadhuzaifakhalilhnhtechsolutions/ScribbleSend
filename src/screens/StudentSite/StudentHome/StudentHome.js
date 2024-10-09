import React, { useState, useEffect, useCallback } from 'react';
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
  Dimensions,
  RefreshControl,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { THEME_COLOR, THEME_COLOR_LIGHT } from '../../../utils/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { styles } from './HomeStyles';
import { getApiWithToken } from '../../../api/helper';
import { BaseUrl } from '../../../api/BaseUrl';
import { useSelector } from 'react-redux';
import Loader from '../../../components/Loader/Loader';
import { showMessage } from 'react-native-flash-message';

const { height } = Dimensions.get('screen');

const StudentHome = ({ navigation }) => {
  const [searches, setsearches] = useState('');
  // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // const [date, setdate] = useState(moment().format('YYYY-MM-DD'));
  const userData = useSelector(state => state.userReducer.user.data);
  const [savedAssissments, setSavedAssissments] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [allCounts, setAllCounts] = useState(null);
  const [filterData, setfilterData] = useState([]);
  const [searchLoader, setsearchLoader] = useState(false);

  useEffect(() => {
    getAssissments();
    getCount();

    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const onRefresh = useCallback(() => {
    getAssissments();
    getCount();
  }, []);

  const getAssissments = () => {
    setisLoading(true);
    getApiWithToken(`${BaseUrl}/api/student/assessment`, '', userData.token)
      .then(res => {
        console.log('res home==>', res.data);
        if (res.data.status) {
          setSavedAssissments(res.data.data);
          setfilterData([]);
          setisLoading(false);
        } else {
          setisLoading(false);
        }
      })
      .catch(error => {
        console.log('error home==>', error);
        setisLoading(false);
        showMessage({
          message: 'Failed',
          description: 'something went wrong! Please try again later.',
          type: 'danger',
          floating: true,
          animated: true,
        });
      });
  };

  const getCount = () => {
    getApiWithToken(
      `${BaseUrl}/api/student/assessment/counts/total`,
      '',
      userData.token,
    )
      .then(res => {
        console.log('res counts==>', res.data);
        if (res.data.status) {
          setAllCounts(res.data?.data);
        } else {
        }
      })
      .catch(error => {
        console.log('error counts==>', error);
      });
  };

  // const hideDatePicker = () => {
  //   setDatePickerVisibility(false);
  // };

  // const handleConfirm = date => {
  //   const formattedDate = moment(date).format('YYYY-MM-DD');
  //   setdate(() => formattedDate);
  //   hideDatePicker();
  // };

  const handleSearched = data => {
    if (data.trim() == '') {
      setfilterData([]);
      setsearches(data);
    } else {
      setsearches(data);
      setsearchLoader(true);
      getApiWithToken(
        `${BaseUrl}/api/student/teachers/assessments?username=${data}`,
        '',
        userData?.token,
      )
        .then(res => {
          console.log('response searched==>', res.data);
          if (res.data.status) {
            setTimeout(() => {
              setfilterData(res.data.data);
              setsearchLoader(false);
            }, 500);
          } else {
            setfilterData([]);
            setsearchLoader(false);
          }
        })
        .catch(error => {
          console.log('error searched==>', error);
          setfilterData([]);
          setsearchLoader(false);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={THEME_COLOR} />
      {isLoading && <Loader />}
      {keyboardStatus
        ? navigation.setOptions({
            tabBarStyle: { display: 'none' },
          })
        : navigation.setOptions({
            tabBarStyle: { display: 'flex' },
          })}
      <KeyboardAvoidingView
        style={styles.main}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.userDiv}>
            <Text style={styles.usernames}>Hi {userData.fname}</Text>
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
              placeholder={'Search teacher here...'}
              placeholderTextColor="#64748B"
              value={searches}
              onChangeText={handleSearched}
              style={styles.input}
              cursorColor={THEME_COLOR}
              selectionColor={THEME_COLOR_LIGHT}
            />
            {/* <TouchableOpacity
              style={styles.calenderBtn}
              onPress={() => setDatePickerVisibility(true)}>
              <Text style={{ ...styles.userDetails, fontFamily: PopingBold }}>
                {moment(date).format('DD/MM')}
              </Text>
              <Ionicons name="calendar" size={24} color={THEME_COLOR} />
            </TouchableOpacity> */}
          </View>

          <View style={styles.divBox}>
            <View style={styles.divBox1}>
              <View style={styles.divBox2}>
                <Text style={{ ...styles.text1, color: '#B4530A' }}>
                  {/* {allCounts?.presence} */}
                  {userData.teacher?.length}
                </Text>
                <Text style={styles.text2}>Enroll Teachers</Text>
              </View>
              <View style={styles.divBox2}>
                <Text style={{ ...styles.text1, color: '#4078D3' }}>
                  {allCounts?.completeness}
                </Text>
                <Text style={styles.text2}>Completeness</Text>
              </View>
            </View>
            <View style={styles.divBox1}>
              <View style={styles.divBox2}>
                <Text style={{ ...styles.text1, color: '#52B6DF' }}>
                  {allCounts?.assessment_count}
                </Text>
                <Text style={styles.text2}>Assignments</Text>
              </View>
              <View style={styles.divBox2}>
                <Text style={{ ...styles.text1, color: '#F59E0C' }}>
                  {allCounts?.not_attempt}
                </Text>
                <Text style={styles.text2}>Not Attend</Text>
              </View>
            </View>
          </View>

          <View style={styles.BottomBox}>
            <Text style={styles.headingText}>Saved WorkSheets</Text>
            {searchLoader ? (
              <ActivityIndicator
                color={THEME_COLOR}
                size={'large'}
                style={{ marginTop: 50 }}
              />
            ) : (
              <ScrollView
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    colors={[THEME_COLOR]}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    title="Pull to refresh"
                    tintColor={THEME_COLOR}
                  />
                }>
                {filterData?.length > 0 || savedAssissments?.length > 0 ? (
                  filterData?.length > 0 ? (
                    filterData?.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={styles.worksheetBtn}
                          onPress={() =>
                            navigation.navigate('QuestionList', { item })
                          }>
                          <Text numberOfLines={1} style={styles.worksheetText}>
                            {moment(item?.created_at).format('DD-MM-YY') +
                              ' ' +
                              item?.heading}
                          </Text>
                        </TouchableOpacity>
                      );
                    })
                  ) : (
                    savedAssissments?.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={styles.worksheetBtn}
                          onPress={() =>
                            navigation.navigate('QuestionList', { item })
                          }>
                          <Text numberOfLines={1} style={styles.worksheetText}>
                            {moment(item?.created_at).format('DD-MM-YY') +
                              ' ' +
                              item?.heading}
                          </Text>
                        </TouchableOpacity>
                      );
                    })
                  )
                ) : (
                  <View
                    style={{
                      marginTop: height * 0.15,
                    }}>
                    <Text style={styles.emptyText}>
                      No saved worksheets found.
                    </Text>
                  </View>
                )}
              </ScrollView>
            )}
          </View>

          {/* <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          /> */}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default StudentHome;
