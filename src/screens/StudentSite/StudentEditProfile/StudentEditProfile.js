import {
  Dimensions,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { BG_COLOR, Black, THEME_COLOR, White } from '../../../utils/Color';
import Header from '../../../components/Header/Header';
import Input from '../../../components/TextInput/Input';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';
import { PopingBold } from '../../../utils/Fonts';
import Button from '../../../components/Button/Button';
import { launchImageLibrary } from 'react-native-image-picker';
import {
  PERMISSIONS,
  request,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
import { getApi, getApiWithToken, PostApi } from '../../../api/helper';
import { BaseUrl } from '../../../api/BaseUrl';
import { setAllTeachers, updateUser } from '../../../stores/actions/userAction';
import { showMessage } from 'react-native-flash-message';
import Loader from '../../../components/Loader/Loader';
import DeviceInfo from 'react-native-device-info';
import DropdownComponent from '../../../components/DropDownpicker';

const { height, width } = Dimensions.get('screen');

const StudentEditProfile = ({ navigation }) => {
  const userData = useSelector(state => state.userReducer.user.data);
  const allTeachers = useSelector(state => state.userReducer.teachers);
  const [fullName, setfullName] = useState(userData.fname);
  const [lastName, setLastName] = useState(userData.lname);
  const [androidVersion, setAndroidVersion] = useState('');
  const [teacherLoader, setteacherLoader] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [value, setValue] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState([]);
  const dispatch = useDispatch();
  const [image, setImage] = useState({
    name: '1000000067.jpg',
    type: 'image/jpeg',
    uri: userData?.image,
  });

  useEffect(() => {
    getAllTeacher();
    const version = DeviceInfo.getSystemVersion();
    const majorVersion = version.split('.')[0];
    setAndroidVersion(majorVersion);
  }, []);

  useEffect(() => {
    if (items?.length > 0 && selectedTeacher?.length > 0) {
      appendSelectedTeachers(selectedTeacher);
    }
  }, [items, selectedTeacher]);

  const getAllTeacher = () => {
    setteacherLoader(true);
    getApi(`${BaseUrl}/api/teachers`)
      .then(res => {
        // console.log('res all teacehrs---->', res.data.data);
        if (res.data.status) {
          setItems(res.data?.data);
          getSelectedTeacher();
          dispatch(setAllTeachers(res.data?.data));
        } else {
          setteacherLoader(false);
        }
      })
      .catch(err => {
        setteacherLoader(false);
        console.log('err all teacehrs---->', err);
      });
  };

  const getSelectedTeacher = () => {
    getApiWithToken(`${BaseUrl}/api/student/teachers`, '', userData.token)
      .then(res => {
        // console.log('res selected teacehrs---->', res.data.data);
        if (res.data.status) {
          setSelectedTeacher(res.data.data);
          appendSelectedTeachers(res.data.data);
        } else {
          setteacherLoader(false);
        }
      })
      .catch(err => {
        setteacherLoader(false);
        console.log('err selected teacehrs---->', err);
      });
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      await requestAndroidPermissions();
    } else {
      const statuses = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (statuses[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.GRANTED) {
        console.log('All permissions granted');
        handlePickImage();
      } else {
        console.log('Permissions denied');
      }
    }
  };

  const requestPermissionsArray = [
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  ];

  const requestAndroidPermissions = async () => {
    try {
      const granted = await requestMultiple(
        androidVersion < 13 ? requestPermissionsArray : [],
      );
      if (
        androidVersion >= 13
          ? handlePickImage()
          : granted[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] ===
              RESULTS.GRANTED &&
            granted[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] ===
              RESULTS.GRANTED
      ) {
        console.log('All permissions granted');
        handlePickImage();
      } else {
        console.log('Permissions denied');
      }
    } catch (err) {
      console.log('err permissions', err);
    }
  };

  const handlePickImage = () => {
    const options = {
      mediaType: 'image',
      quality: 1,
      selectionLimit: 1,
    };
    launchImageLibrary(options, response => {
      //   console.log('response', response);
      if (response.assets) {
        setImage({
          name: response.assets[0]?.fileName,
          type: response.assets[0]?.type,
          uri: response.assets[0]?.uri,
        });
      }
    });
  };

  const handleSubmit = () => {
    setisLoading(true);
    const formdata = new FormData();
    formdata.append('fname', fullName);
    formdata.append('lname', lastName);
    formdata.append('image', image);
    value.map((v, i) => {
      formdata.append(`teacher_id[${i}]`, v);
    });

    console.log(formdata);

    PostApi(`${BaseUrl}/api/student/profile/update`, formdata, userData?.token)
      .then(res => {
        console.log('response edit profile==>', res?.data);
        if (res?.data?.status) {
          dispatch(updateUser(res?.data));
          navigation.goBack();
          setisLoading(false);
          showMessage({
            message: 'Success',
            description: 'Profile Updated Successfully',
            type: 'success',
            floating: true,
            animated: true,
          });
        } else {
          setisLoading(false);
          showMessage({
            message: 'Error',
            description: 'something went wrong! Please try again later.',
            type: 'danger',
            floating: true,
            animated: true,
          });
        }
      })
      .catch(error => {
        console.log('error edit profile==>', error);
        setisLoading(false);
        const errorKeys = error && Object.keys(error?.response?.data?.errors);

        if (errorKeys?.length > 0) {
          errorKeys.forEach(key => {
            error?.response?.data?.errors[key]?.forEach(errorMsg => {
              showMessage({
                message: 'Failed',
                description: errorMsg,
                type: 'danger',
                animated: true,
                floating: true,
              });
            });
          });
        }
      });
  };

  const appendSelectedTeachers = data => {
    setValue(prev => {
      const updatedValues = [...prev];
      items?.forEach(val => {
        data?.forEach(teacher => {
          if (
            val.id === teacher.teacher_id &&
            !updatedValues.includes(val.id)
          ) {
            updatedValues.push(val.id);
          }
        });
      });

      return updatedValues;
    });

    setteacherLoader(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={THEME_COLOR} barStyle={'light-content'} />
      {isLoading || teacherLoader ? <Loader /> : null}
      <Header
        icon={true}
        onPress={() => navigation.goBack()}
        title={'Edit Profile'}
      />
      <KeyboardAvoidingView
        style={styles.main}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.userProfile}>
            <FastImage
              source={{ uri: image.uri }}
              style={styles.userImage}
              resizeMode="cover"
            />
          </View>
          <TouchableOpacity
            style={styles.editIconDiv}
            onPress={requestPermissions}>
            <Feather name="edit" color={White} size={24} />
          </TouchableOpacity>
          <View style={styles.inputDiv}>
            <Text style={styles.lebal}>Email:</Text>
            <Input
              placeholder="Email"
              editable={false}
              value={userData.email}
            />
          </View>
          <View style={styles.inputDiv}>
            <Text style={styles.lebal}>First Name:</Text>
            <Input
              placeholder="Full Name"
              value={fullName}
              onChangeText={setfullName}
            />
          </View>
          <View style={styles.inputDiv}>
            <Text style={styles.lebal}>Last Name:</Text>
            <Input
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
          <View style={styles.inputDiv}>
            <Text style={styles.lebal}>Selected Teachers:</Text>
            <DropdownComponent
              items={items}
              setItems={setItems}
              value={value}
              setValue={setValue}
            />
          </View>
          <Button
            title={'Update Profile'}
            style={{ marginVertical: 20 }}
            onPress={handleSubmit}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default StudentEditProfile;

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
    height: height / 4.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 3,
  },
  userImage: {
    height: 150,
    width: 150,
    backgroundColor: '#EEE',
    borderRadius: 360,
    alignSelf: 'center',
  },
  editIconDiv: {
    position: 'absolute',
    top: height * 0.17,
    right: width * 0.32,
    backgroundColor: THEME_COLOR,
    borderRadius: 360,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputDiv: {
    backgroundColor: White,
    borderRadius: 10,
    width: '100%',
    padding: 6,
    marginVertical: 3,
  },
  lebal: {
    fontSize: 14,
    fontFamily: PopingBold,
    color: Black,
    left: 10,
  },
});
