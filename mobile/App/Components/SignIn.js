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
import ProposeTrade from './ProposeTrade';
import Tasks from './Tasks';

import sharedStyles from '../Styles';
import { BLUE, LIGHT_GREY } from '../Styles/colors';
import store from '../Data';

let email = 'yustynn@gmail.com';

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
    });
    store.dispatch({
      type: 'SET_MEMBERS',
      members: room.members,
    });
    store.dispatch({
      type: 'SET_RENT_DUE_DATE',
      rentDueDate: room.dueDate,
    });
  })
  .then( () => {
    console.dir( store.getState() );
    console.log('Going to Tasks');
    navigator.push({ component: Tasks });
  })
  .catch( console.error.bind(console) );
};

const SignIn = ({ navigator }) => (
  <View style={ [sharedStyles.full, sharedStyles.center] }>
    <IconHeader title='Welcome to RoomEase.'/>
    <View style={ styles.space }>
      <InputLabel text='email' />
      <TextInput
        onChange={ captureInput }
        style={ styles.input }
      />
    </View>
    <View style={ styles.divider } />
    <Text
      onPress={ submitEmail(navigator) }
      style={ [sharedStyles.blueButton, styles.blueButton] }
    >
      SIGN IN WITH GOOGLE</Text>
  </View>
)

const styles = StyleSheet.create({
  blueButton: {
    backgroundColor: BLUE,
    color: 'white',
  },
  divider: {
    borderColor: LIGHT_GREY,
    borderWidth: .5,
    marginBottom: 50,
    width: 300,
  },
  input: {
    height: 50,
    marginBottom: -20,
    width: 300,
  },
  space: {
    marginBottom: 20,
  }
})

export default SignIn;
