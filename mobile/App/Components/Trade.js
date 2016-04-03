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
    const { roomId, tradeId } = this.props;
    const tasksRef = new Firebase(`https://room-ease.firebaseio.com/rooms/${roomId}/thisMonthsTasks`);
    const tradeRef = new Firebase(`https://room-ease.firebaseio.com/rooms/${roomId}/proposedTrades/${tradeId}`)

    this.bindAsArray(tasksRef, 'tasks');
    this.bindAsObject(tradeRef, 'trade');

  },

  render: function() {
    const { members, user } = this.props;
    const { trade } = this.state;

    const initiator = members[trade.initiator];
    initiator.firstName = initiator.name.split(' ')[0]

    const tasks = this.state.tasks.filter( (task) => task );

    trade.tasksForInitator = trade.tasksForInitiator
    .filter( (task) => task )
    .map( (id) => (
      tasks.find( (task) => task.id === id )
    ) );

    trade.tasksForRecipient = trade.tasksForRecipient
    .filter( (task) => task )
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
        <View style={ sharedStyles.row }>
          <View style={ [sharedStyles.full, sharedStyles.row] }>
            <Text
              style={ [styles.button, styles.red ]}>
              NO
            </Text>
            <Text
              style={ [styles.button, styles.green ]} >
              YES
            </Text>
          </View>
        </View>
      </View>
    )
  },
})

const mapStateToProps = (state) => ({
  members: state.members,
  roomId: state.roomId,
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
  title: {
    color: GREY,
    fontSize: 18,
    letterSpacing: 2.5,
    paddingLeft: 20,
  }
});
