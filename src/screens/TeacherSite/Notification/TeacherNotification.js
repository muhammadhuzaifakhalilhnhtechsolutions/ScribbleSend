import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { BG_COLOR, Black, THEME_COLOR } from '../../../utils/Color';
import Header from '../../../components/Header/Header';
import { PopingBold } from '../../../utils/Fonts';

const TeacherNotification = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={THEME_COLOR} />
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
