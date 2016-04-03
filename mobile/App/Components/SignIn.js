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
import Tasks from './Tasks';

import sharedStyles from '../Styles';
import { BLUE } from '../Styles/colors';
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

    const members = room.members.reduce( (members, member) => {
      members[member.id] = member;
      return members;
    }, {});
    store.dispatch({
      type: 'SET_USER',
      user,
    });
    store.dispatch({
      type: 'SET_MEMBERS',
      members: members,
    });
    store.dispatch({
      type: 'SET_RENT_DUE_DATE',
      rentDueDate: room.dueDate,
    });
  })
  .then( () => {
    console.dir( store.getState() );
    console.log('Going to Tasks');
    navigator.push({ component: Tasks, showMenu: true });
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
        style={ sharedStyles.input }
      />
    </View>
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
  space: {
    marginBottom: 20,
  }
})

export default SignIn;
