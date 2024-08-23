import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { BG_COLOR, Black, THEME_COLOR, White } from '../../../utils/Color';
import Button from '../../../components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../stores/actions/userAction';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import { PopingBold, PoppinsRegular } from '../../../utils/Fonts';
import Header from '../../../components/Header/Header';

const { height, width } = Dimensions.get('screen');
const DATA = [
  {
    id: 1,
    name: 'Change Password',
    goTo: 'StudentChangePassword',
  },
  {
    id: 2,
    name: 'Terms & Conditions',
    goTo: 'StudentTerms',
  },
];

const StudentSettings = ({ navigation }) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userReducer?.user?.data);

  const renderItems = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.box}
        key={index}
        onPress={() => navigation.navigate(item.goTo)}>
        <Text style={styles.goToName}>{item.name}</Text>
        <Ionicons name="chevron-forward" size={28} color={THEME_COLOR} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={THEME_COLOR} />
      <Header
        icon={true}
        onPress={() => navigation.goBack()}
        title={'Settings'}
      />
      <View style={styles.main}>
        <FlatList
          data={DATA}
          nestedScrollEnabled={true}
          ListHeaderComponent={
            <View style={styles.userProfile}>
              <TouchableOpacity
                style={styles.logout}
                onPress={() => dispatch(updateUser(''))}>
                <Ionicons
                  name="log-out-outline"
                  color={THEME_COLOR}
                  size={34}
                />
              </TouchableOpacity>
              <FastImage
                source={{ uri: userData?.image }}
                style={styles.userImage}
                resizeMode="cover"
              />
              <Text style={styles.userName}>{userData?.name}</Text>
              <Button
                title="Edit Profile"
                textStyle={styles.titleStyle}
                style={styles.ButtonDiv}
                onPress={() => navigation.navigate('StudentEditProfile')}
              />
            </View>
          }
          keyExtractor={item => item?.id.toString()}
          renderItem={renderItems}
        />
      </View>
    </SafeAreaView>
  );
};

export default StudentSettings;

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
  },
  userProfile: {
    backgroundColor: White,
    width: '100%',
    height: height / 3.2,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 10,
    marginTop: 10,
  },
  others: {
    width: '100%',
    marginTop: 4,
    flexGrow: 1,
  },
  userImage: {
    height: 150,
    width: 150,
    backgroundColor: '#EEE',
    borderRadius: 360,
    alignSelf: 'center',
  },
  userName: {
    color: Black,
    fontSize: 20,
    fontWeight: '700',
    fontFamily: PopingBold,
    textTransform: 'uppercase',
  },
  ButtonDiv: {
    backgroundColor: 'lightgray',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  titleStyle: {
    fontFamily: PoppinsRegular,
    fontSize: 12,
    color: Black,
  },
  box: {
    backgroundColor: White,
    width: '100%',
    height: height / 14,
    marginVertical: 4,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 14,
  },
  goToName: {
    color: Black,
    fontFamily: PopingBold,
    fontSize: 14,
  },
  logout: {
    alignSelf: 'flex-end',
    right: 10,
    top: 10,
    position: 'absolute',
    zIndex: 1,
  },
});
