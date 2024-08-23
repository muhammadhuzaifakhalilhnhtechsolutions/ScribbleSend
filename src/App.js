import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './stores';
import { NavigationContainer } from '@react-navigation/native';
import Splash from './screens/Splash/Splash';
import AllScreens from './navigation/AllScreen';
import FlashMessage from 'react-native-flash-message';
import NetInfo from '@react-native-community/netinfo';
import { Alert, BackHandler } from 'react-native';

const App = () => {
  const [isSplash, setisSplash] = useState(true);

  useEffect(() => {
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

  return (
    <NavigationContainer>
      <Provider store={store}>
        {isSplash ? <Splash /> : <AllScreens />}
        <FlashMessage animationDuration={1000} duration={2000} position="top" />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
