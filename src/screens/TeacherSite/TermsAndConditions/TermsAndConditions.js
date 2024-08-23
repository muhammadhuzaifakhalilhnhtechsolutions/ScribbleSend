import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { BG_COLOR, Black, THEME_COLOR } from '../../../utils/Color';
import Header from '../../../components/Header/Header';
import { PopingBold, PoppinsRegular } from '../../../utils/Fonts';

const TermsAndConditions = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.conatiner}>
      <StatusBar barStyle="light-content" backgroundColor={THEME_COLOR} />
      <Header
        icon={true}
        title={'Terms and Conditions'}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.main}>
        <Text style={styles.title}>Terms and Conditions</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          sollicitudin libero at ligula malesuada, id consequat justo faucibus.
          Sed non consectetur felis, vel ultricies arcu. Donec vel nisi velit.
          Donec fermentum, risus non cursus malesuada, lectus ex bibendum velit,
          non efficitur lorem neque ut neque. Donec vel ipsum id eros viverra
          pellentesque.
        </Text>
        <Text style={styles.description}>
          In hac habitasse platea dictumst. Sed ac efficitur neque. Sed
          consectetur, purus sit amet commodo condimentum, felis purus faucibus
          neque, vel eleifend neque mauris eu nunc. Sed tincidunt consectetur
          ipsum, at scelerisque arcu rutrum eu. Vestibulum ante ipsum primis
          Nullam in convallis ipsum. Donec laoreet, felis vel sagittis lacus, et
          ultrices mauris. Sed vel orci non dolor vulputate
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default TermsAndConditions;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: BG_COLOR,
    width: '100%',
  },
  main: {
    flex: 1,
    width: '96%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: PopingBold,
    marginVertical: 20,
    color: Black,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 20,
    color: Black,
    fontFamily: PoppinsRegular,
  },
});
