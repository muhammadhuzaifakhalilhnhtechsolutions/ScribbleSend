import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  TextInput,
  Dimensions,
  RefreshControl,
  FlatList,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { BG_COLOR, THEME_COLOR, THEME_COLOR_LIGHT } from '../../../utils/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { styles } from '../../StudentSite/StudentHome/HomeStyles';
import { useSelector } from 'react-redux';
import { getApi, getApiWithToken } from '../../../api/helper';
import { BaseUrl } from '../../../api/BaseUrl';
import Loader from '../../../components/Loader/Loader';
import { PopingBold } from '../../../utils/Fonts';

const { height } = Dimensions.get('screen');

const Dashboard = ({ navigation }) => {
  const [searches, setsearches] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setdate] = useState(moment().format('YYYY-MM-DD'));
  const userData = useSelector(state => state.userReducer.user.data);
  const [receivedAssissments, setReceivedAssissments] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [allCounts, setAllCounts] = useState(null);
  const [filterData, setfilterData] = useState([]);
  const [searchLoader, setsearchLoader] = useState(false);

  console.log('userdata==>',userData);

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
    getApiWithToken(`${BaseUrl}/api/teacher/assessment`, '', userData?.token)
      .then(res => {
        console.log('res dashboard==>', res.data);
        if (res.data.status) {
          setReceivedAssissments(res.data.data);
          setisLoading(false);
        }
      })
      .catch(error => {
        console.log('error dashboard==>', error);
        setisLoading(false);
      });
  };

  const getCount = () => {
    getApiWithToken(
      `${BaseUrl}/api/teacher/assessment/received/pending/count`,
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

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setdate(() => formattedDate);
    hideDatePicker();
  };

  const handleSearched = data => {
    if (data.trim() == '') {
      setfilterData([]);
      setsearches(data);
      console.log('iffff');
    } else {
      console.log('else');
      setsearches(data);
      setsearchLoader(true);
      getApiWithToken(
        `${BaseUrl}/api/teacher/students/assessments?name=${data}&date=${date}`,
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
      <StatusBar backgroundColor={THEME_COLOR} barStyle="light-content" />
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
            <Text style={styles.usernames}>Hi {userData?.name}</Text>
            <Text style={styles.userDetails}>Here is your activity today,</Text>
            <TouchableOpacity
              style={styles.notiDiv}
              onPress={() => navigation.navigate('TeacherNotification')}>
              <Ionicons
                name="notifications-outline"
                size={26}
                color={THEME_COLOR}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputDiv}>
            <TextInput
              placeholder={'Search student here...'}
              placeholderTextColor="#64748B"
              value={searches}
              onChangeText={handleSearched}
              style={styles.input}
              cursorColor={THEME_COLOR}
              selectionColor={THEME_COLOR_LIGHT}
            />
            <TouchableOpacity
              style={styles.calenderBtn}
              onPress={() => setDatePickerVisibility(true)}>
              <Text style={{ ...styles.userDetails, fontFamily: PopingBold }}>
                {moment(date).format('DD/MM')}
              </Text>
              <Ionicons name="calendar" size={24} color={THEME_COLOR} />
            </TouchableOpacity>
          </View>

          <View style={styles.divBox}>
            <View style={styles.divBox1}>
              <View style={styles.divBox2}>
                <Text style={{ ...styles.text1, color: '#B4530A' }}>
                  {allCounts?.received_count}
                </Text>
                <Text style={styles.text2}>Received</Text>
              </View>
              <View style={styles.divBox2}>
                <Text style={{ ...styles.text1, color: '#4078D3' }}>
                  {allCounts?.pending_count}
                </Text>
                <Text style={styles.text2}>Pendings</Text>
              </View>
            </View>
          </View>

          <View style={{ ...styles.BottomBox, height: height * 0.53 }}>
            <Text style={styles.headingText}>Received Assissments</Text>

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
                {filterData?.length > 0 || receivedAssissments?.length > 0 ? (
                  filterData?.length > 0 ? (
                    filterData?.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={styles.worksheetBtn}
                          onPress={() =>
                            navigation.navigate('StudentList', { item })
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
                    receivedAssissments?.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={styles.worksheetBtn}
                          onPress={() =>
                            navigation.navigate('StudentList', { item })
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
                      No received worksheets found.
                    </Text>
                  </View>
                )}
              </ScrollView>
            )}
          </View>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </ScrollView>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('AddAssessment')}>
          <Ionicons name="add" color={THEME_COLOR} size={32} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Dashboard;
