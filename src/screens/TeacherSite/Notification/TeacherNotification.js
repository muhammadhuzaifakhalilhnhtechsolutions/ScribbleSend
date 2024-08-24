import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { BG_COLOR, Black, THEME_COLOR } from '../../../utils/Color';
import Header from '../../../components/Header/Header';
import { PopingBold } from '../../../utils/Fonts';
import { useSelector } from 'react-redux';
import { getApiWithToken } from '../../../api/helper';
import { BaseUrl } from '../../../api/BaseUrl';
import Loader from '../../../components/Loader/Loader';

const TeacherNotification = ({ navigation }) => {
  const userData = useSelector(state => state.userReducer?.user?.data);
  const [notificationData, setNotificationData] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    getAllNotifications();
  }, []);

  const getAllNotifications = () => {
    setisLoading(true);
    getApiWithToken(
      `${BaseUrl}/api/teacher/assessment/notifications/all`,
      '',
      userData?.token,
    )
      .then(res => {
        console.log('res notiii===>', res.data);
        if (res.data.status) {
          setNotificationData(res.data.data);
          setisLoading(false);
        } else {
          setisLoading(false);
        }
      })
      .catch(error => {
        setisLoading(false);
        console.log('error notiii===>', error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={THEME_COLOR} />
      {isLoading && <Loader />}
      <Header
        title={'Notifications'}
        icon={true}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.main}>
        <FlatList
          data={[]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyDiv}>
              <Text style={styles.emptyText}>No Notifications yet</Text>
            </View>
          }
          renderItem={({ item, index }) => {
            return (
              <View key={index}>
                <Text>{item.title}</Text>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default TeacherNotification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: BG_COLOR,
  },
  main: {
    flex: 1,
    width: '96%',
    alignSelf: 'center',
  },
  emptyDiv: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 300,
  },
  emptyText: {
    fontFamily: PopingBold,
    fontSize: 14,
    color: Black,
  },
});
