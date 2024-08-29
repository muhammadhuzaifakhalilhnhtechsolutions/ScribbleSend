import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './stores';
import { NavigationContainer } from '@react-navigation/native';
import Splash from './screens/Splash/Splash';
import AllScreens from './navigation/AllScreen';
import FlashMessage from 'react-native-flash-message';
import NetInfo from '@react-native-community/netinfo';
import { Alert, BackHandler, SafeAreaView, StatusBar } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { THEME_COLOR } from './utils/Color';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const App = () => {
  const [isSplash, setisSplash] = useState(true);

  useEffect(() => {
    requestUserPermission();
    GoogleSignin.configure({
      webClientId:
        '99750710423-b2vk6rfgifve4k0tnmu6cep0a2rrecg1.apps.googleusercontent.com',
      iosClientId:
        '99750710423-69bf0vsl8hg2vr62aum0d4rnp23utnm2.apps.googleusercontent.com',
    });
    setTimeout(() => {
      setisSplash(false);
    }, 3000);
    NetInfo.addEventListener(info => {
      if (!info.isConnected) {
        Alert.alert(
          'Connection Error',
          'your internet seems to be offline come back when you are online',
          [
            {
              text: 'OK',
              onPress: () => BackHandler.exitApp(),
            },
          ],
        );
      }
    });
  }, []);

  const requestUserPermission = async () => {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus) {
      console.log('Permission notification status:', authorizationStatus);
    } else {
      console.log('No permission for notification');
    }
  };

  return (
    <NavigationContainer>
      <Provider store={store}>
        {isSplash ? <Splash /> : <AllScreens />}
        <SafeAreaView style={{ flex: 0 }} />
        <StatusBar barStyle={'light-content'} backgroundColor={THEME_COLOR} />
        <FlashMessage animationDuration={1000} duration={2000} position="top" />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
