import React, {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import Header from './Header';
import InputLabel from './Common/InputLabel';

import sharedStyles from '../Styles';

let email = '';

const captureInput = (e) => { email = e.nativeEvent.text; }
const submitEmail = () => { console.log(email) }

const SignIn = ({ navigator }) => (
  <View style={ [sharedStyles.fullWidth, sharedStyles.center] }>
    <Header title='Welcome to RoomEase.'/>
    <View style={ styles.space }>
      <InputLabel text='email' />
      <TextInput
        onChange={ captureInput }
        style={ sharedStyles.input }
      />
    </View>
    <Text
      onPress={ submitEmail }
      style={ [sharedStyles.blueButton] }
    >
      SIGN IN WITH GOOGLE</Text>
  </View>
)

const styles = StyleSheet.create({
  space: {
    marginBottom: 20,
  }
})

export default SignIn;
