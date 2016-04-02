import React, {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Firebase from 'firebase';

import IconHeader from './IconHeader';
import InputLabel from './Common/InputLabel';
import Overview from './Overview';

import sharedStyles from '../Styles';
import store from '../Data';

let email = '';

const ref = new Firebase(`https://room-ease.firebaseio.com/`);

const captureInput = (e) => { email = e.nativeEvent.text; };
const submitEmail = (navigator) => () => {
  email = email.toLowerCase();
  const id = email.replace(/@.*/, '');

  fetch(`https://room-ease.firebaseio.com/googleIds/${id}/.json`)
  .then( (res) => res.json() )
  .then( (roomId) => {
    store.dispatch({
      type: 'SET_ROOM_ID',
      roomId,
    });
    return fetch(`https://room-ease.firebaseio.com/rooms/${roomId}/.json`)
  })
  .then( (res) => res.json() )
  .then( (room) => {
    console.log(1, email);
    const user = room.members.find( (member) => member.email === email );
    store.dispatch({
      type: 'SET_USER',
      user,
    })
  })
  .then( console.dir.bind(console) )
  .then( () => {
    console.dir( store.getState() );
    console.log('Going to Overview');
    navigator.push({ component: Overview });
  })
  .catch( console.error.bind(console) );
};

const SignIn = ({ navigator }) => (
  <View style={ [sharedStyles.fullWidth, sharedStyles.center] }>
    <IconHeader title='Welcome to RoomEase.'/>
    <View style={ styles.space }>
      <InputLabel text='email' />
      <TextInput
        onChange={ captureInput }
        style={ sharedStyles.input }
      />
    </View>
    <Text
      onPress={ submitEmail(navigator) }
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
