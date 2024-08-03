import { Dimensions, StyleSheet } from 'react-native';
import {
  BG_COLOR,
  Black,
  THEME_COLOR,
  THEME_COLOR_LIGHT,
  White,
} from '../../../utils/Color';
import { PopingBold, PoppinsRegular } from '../../../utils/Fonts';

const { height } = Dimensions.get('screen');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    width: '100%',
  },
  main: {
    flex: 1,
    width: '100%',
  },
  userDiv: {
    padding: 16,
    width: '100%',
  },
  usernames: {
    fontSize: 18,
    color: THEME_COLOR,
    fontFamily: PopingBold,
  },
  userDetails: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: PoppinsRegular,
  },
  notiDiv: {
    width: 40,
    height: 40,
    backgroundColor: `rgba(209, 227, 255,0.6)`,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    top: '40%',
  },
  divBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 10,
  },
  divBox1: {
    width: '96%',
    alignSelf: 'center',
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divBox2: {
    backgroundColor: White,
    width: '48%',
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 20,
  },
  text1: {
    fontSize: 20,
    color: THEME_COLOR,
    fontFamily: PopingBold,
  },
  text2: {
    fontSize: 14,
    color: '#64748B',
    fontFamily: PopingBold,
  },
  BottomBox: {
    backgroundColor: White,
    borderRadius: 10,
    padding: 10,
    height: height * 0.48,
    width: '96%',
    alignSelf: 'center',
  },
  headingText: {
    fontSize: 16,
    color: '#64748B',
    fontFamily: PopingBold,
    textAlign: 'center',
    marginBottom: 10,
  },
  worksheetBtn: {
    backgroundColor: THEME_COLOR_LIGHT,
    borderRadius: 5,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
  },
  worksheetText: {
    color: Black,
    fontSize: 14,
    fontFamily: PoppinsRegular,
    width: '100%',
  },
  inputDiv: {
    backgroundColor: White,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: '96%',
    alignSelf: 'center',
  },
  input: {
    width: '90%',
    paddingLeft: 10,
    fontSize: 14,
    color: '#64748B',
    fontFamily: PoppinsRegular,
  },
  calenderBtn: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
