import { StyleSheet } from 'react-native';
import {
  BLUE,
  GREEN,
  GREY,
  LIGHT_GREY
} from './colors';

const createButtonStyle = (color) => ({
  borderColor: color,
  borderWidth: 2,
  color: color,
  fontSize: 16,
  fontWeight: '600',
  letterSpacing: 1,
  paddingBottom: 15,
  paddingLeft: 30,
  paddingRight: 30,
  paddingTop: 15,
});

export default StyleSheet.create({
  blueButton: createButtonStyle(BLUE),
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerSelf: {
    alignSelf: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  container: {
    padding: 20,
  },
  fullWidth: {
    flex: 1,
  },
  h1: {
    color: GREY,
    fontSize: 24,
    letterSpacing: 0.5,
  },
  input: {
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: GREY,
    height: 50,
    textAlign: 'center',
    width: 300,
  },
  logo: {
    marginBottom: 20,
  },
  greenButton: createButtonStyle(GREEN),
  row: {
    flexDirection: 'row',
  },
  test: {
    borderColor: 'black',
    borderWidth: 5,
  }
});
