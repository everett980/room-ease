import React, {
  Component,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import Firebase from 'firebase';
import moment from 'moment';
import { connect } from 'react-redux';
import ReactFireMixin from 'reactfire';

import Header from './Header';
import Tasks from './Tasks';

import store from '../Data';
import sharedStyles from '../Styles';
import {
  BLUE,
  DARK_BLUE,
  DARK_GREY,
  GREEN,
  GREY,
  LIGHT_BLUE,
  LIGHTER_GREY,
  RED,
} from '../Styles/colors';

const TasksList = ({ tasks, prepend }) => {
  console.log('tasks', tasks)
  tasks = tasks.map( (task, idx) => (
    <View key={ idx } style={ sharedStyles.row }>
      <View>
        <Text>{ prepend }  </Text>
      </View>
      <View style={ sharedStyles.column }>
        <Text>{ task.name }</Text>
        <Text>{ moment(task.endDate).format('M/D') }</Text>
      </View>
    </View>
  ))

  return (
    <View style={ [sharedStyles.container] }>
      { tasks }
    </View>
  )
}

const OfferDetails = ({ tasksFor, tasksTaken, cash, profilePicture, title }) => (
  <View>
    <View style={ [sharedStyles.container, sharedStyles.row, styles.bgAlt] }>
      <Image
        source={{ uri: profilePicture }}
        style={ styles.profilePicture }
      />
    <Text style={ styles.title }>{ title.toUpperCase() }</Text>
    </View>
    <View style={ sharedStyles.container }>
      <Text>{ `${(cash >= 0 ? '+' : '-')} $${ Math.abs(cash) }` }</Text>
    </View>
    <TasksList tasks={ tasksFor } prepend='+' />
    <TasksList tasks={ tasksTaken } prepend='-' />
  </View>
)

const Trade = React.createClass({
  mixins: [ReactFireMixin],

  componentWillMount: function() {
    const { roomId, tradeId, user } = this.props;

    const membersRef = new Firebase(`https://room-ease.firebaseio.com/rooms/${roomId}/members`)
    const tasksRef = new Firebase(`https://room-ease.firebaseio.com/rooms/${roomId}/thisMonthsTasks`);
    const tradeRef = new Firebase(`https://room-ease.firebaseio.com/rooms/${roomId}/proposedTrades/${tradeId}`)
    console.log('user', user)

    membersRef.on('value', (snapshot) => {
      const members = snapshot.val();
      const newUser = members.find( (member) => member.id === user.id )

      store.dispatch({
        type: 'SET_MEMBERS',
        members,
      });
      store.dispatch({
        type: 'SET_USER',
        user: newUser,
      });
    });

    this.bindAsArray(membersRef, 'members');
    this.bindAsArray(tasksRef, 'tasks');
    this.bindAsObject(tradeRef, 'trade');

  },

  accept: function(tasksForInitator, tasksForRecipient, rentIncreaseForInitiator, initiator ) {
    return () => {
      const { user } = this.props;

      console.log(user, 'user')

      const fb = this.firebaseRefs;
      fb.members.child(`${ user.id }`).update({ rentOwedThisMonth: user.rentOwedThisMonth - rentIncreaseForInitiator})
      .then( () => {
        fb.members.child(`${ initiator.id }`).update({ rentOwedThisMonth: initiator.rentOwedThisMonth + rentIncreaseForInitiator})
      } );

      tasksForInitator.forEach( (task) => {
        console.log(`Updating task ${ task.id } to go to ${ initiator.id }`);
        fb.tasks.child(`${ task.id }`).update({ assignedTo: initiator.id })
      } );
      tasksForRecipient.forEach( (task) => {
        console.log(`Updating task ${ task.id } to go to ${ user.id }`);
        fb.tasks.child(`${ task.id }`).update({ assignedTo: user.id })
      } )

      fb.trade.set(null);
      this.props.navigator.push({ component: Tasks });
    }
  },

  reject: function() {
    return () => {
      this.firebaseRefs.trade.set(null);
      this.props.navigator.push({ component: Tasks });
    }
  },

  render: function() {
    const { user } = this.props;
    const { members, trade } = this.state;
    console.log(trade, members, trade.initiator);
    console.log(this.state)

    const initiator = members.find( (member) => member.id === trade.initiator );
    if (!initiator) return <View />
    initiator.firstName = initiator.name.split(' ')[0]

    const tasks = this.state.tasks.filter( (task) => task !== null && task !== undefined );

    trade.tasksForInitator = trade.tasksForInitiator
    .filter( (id) => id !== null )
    .map( (id) => (
      tasks.find( (task) => task.id === id )
    ) );

    trade.tasksForRecipient = trade.tasksForRecipient
    .filter( (id) => id )
    .map( (id) => (
      tasks.find( (task) => task.id === id )
    ) );

    const { tasksForRecipient, tasksForInitator, rentIncreaseForInitiator } = trade;

    const title = `${initiator.firstName}'s Trade Offer`;

    return (
      <View style={ sharedStyles.longHack }>
        <Header title={ title } />
        <OfferDetails
          cash={ rentIncreaseForInitiator }
          profilePicture={ user.profilePicture }
          tasksFor={ tasksForRecipient }
          tasksTaken={ tasksForInitator }
          title='You get'
        />
        <OfferDetails
          cash={ -rentIncreaseForInitiator }
          profilePicture={ user.profilePicture }
          tasksFor={ tasksForInitator }
          tasksTaken={ tasksForRecipient }
          title={ `${initiator.firstName} gets` }
        />
        <View style={ sharedStyles.row, sharedStyles.full }>
          <View style={ [sharedStyles.full, sharedStyles.row, styles.stretch] }>
            <Text
              onPress={ this.reject(tasksForRecipient, tasksForInitator, rentIncreaseForInitiator) }
              style={ [styles.button, styles.red ]}>
              REJECT
            </Text>
            <Text
              onPress={ this.accept(tasksForRecipient, tasksForInitator, rentIncreaseForInitiator, initiator) }
              style={ [styles.button, styles.green ]} >
              ACCEPT
            </Text>
          </View>
        </View>
      </View>
    )
  },
})

const mapStateToProps = (state) => ({
  roomId: state.roomId,
  user: state.user,
  user: state.user,
})

export default connect(mapStateToProps)(Trade);

const styles = StyleSheet.create({
  bgAlt: {
    alignItems: 'center',
    backgroundColor: LIGHTER_GREY,
    paddingTop: 10,
    paddingBottom: 5,
  },
  button: {
    color: 'white',
    flex: 1,
    fontSize: 28,
    fontWeight: '400',
    letterSpacing: 5,
    paddingTop: 25,
    textAlign: 'center',
  },
  green: {
    backgroundColor: GREEN,
  },
  profilePicture: {
    borderRadius: 25,
    height: 50,
    marginBottom: 10,
    width: 50,
  },
  red: {
    backgroundColor: RED,
  },
  stretch: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: GREY,
    fontSize: 18,
    letterSpacing: 2.5,
    paddingLeft: 20,
  }
});
