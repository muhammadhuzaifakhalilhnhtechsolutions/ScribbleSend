import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import HandleSplash from './navigation/Auth';
import { Provider } from 'react-redux';
import { store } from './stores';
import { NavigationContainer } from '@react-navigation/native';
import Splash from './screens/Splash/Splash';
import AllScreens from './navigation/AllScreen';
const App = () => {
  const [isSplash, setisSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setisSplash(false);
    }, 3000);
  }, []);

  return (
    <NavigationContainer>
      <Provider store={store}>
        {isSplash ? <Splash /> : <AllScreens />}
      </Provider>
    </NavigationContainer>
  );
};

export default App;
