import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  BG_COLOR,
  Black,
  THEME_COLOR,
  THEME_COLOR_LIGHT,
  White,
} from '../../../utils/Color';
import { PopingBold, PoppinsRegular } from '../../../utils/Fonts';
import Header from '../../../components/Header/Header';

const QuestionList = ({ navigation, route }) => {
  const data = route.params?.item;
  // console.log('data==>', data.questions);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={THEME_COLOR} />
      <Header
        title={'Questions List'}
        icon={true}
        onPress={() => navigation.goBack()}
      />

      <View style={styles.main}>
        <FlatList
          data={data?.questions}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.itemBox}>
                <View style={styles.count}>
                  <Text style={styles.countText}>{index + 1}</Text>
                </View>
                <TouchableOpacity
                  key={index}
                  style={styles.quesBox}
                  onPress={() =>
                    navigation.navigate('WhiteBoard', { data, item, index })
                  }>
                  <Text style={styles.qestText} numberOfLines={1}>
                    {item?.question_text}
                  </Text>
                  <Text style={styles.qestText2}>{item?.comment_text}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default QuestionList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    width: '100% ',
  },
  main: {
    flex: 1,
    width: '96%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  quesBox: {
    backgroundColor: White,
    borderRadius: 10,
    padding: 10,
    marginVertical: 2,
    width: '85%',
  },
  qestText: {
    fontSize: 14,
    color: Black,
    fontFamily: PopingBold,
    textTransform: 'capitalize',
  },
  qestText2: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: PoppinsRegular,
    fontStyle: 'italic',
  },
  itemBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  count: {
    backgroundColor: THEME_COLOR_LIGHT,
    borderRadius: 10,
    width: '14%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginVertical: 2,
  },
  countText: {
    fontSize: 14,
    color: Black,
    fontFamily: PopingBold,
  },
});
