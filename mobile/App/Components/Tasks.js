import React, {
  Component,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import Firebase from 'firebase';
import { connect } from 'react-redux';
import ReactFireMixin from 'reactfire';

import Header from './Header';

import sharedStyles from '../Styles';
import {
  BLUE,
  DARK_BLUE,
  DARK_GREY,
  GREY,
  LIGHT_GREY,
  LIGHTER_GREY,
} from '../Styles/colors';

const Todos = React.createClass({
  mixins: [ReactFireMixin],

  componentWillMount: function() {
    const { roomId } = this.props;

    const ref = new Firebase(`https://room-ease.firebaseio.com/rooms/${roomId}/thisMonthsTasks`);
    this.bindAsArray(ref, 'tasks');
  },

  toggleTask: function(id, wasCompleted) {
    const updatedTasks = this.state.tasks.map( (task) => {
      if (task.id !== id) return task;
      return { ...task, completed: !task.completed }
    });
    return () => { this.firebaseRefs.tasks.set(updatedTasks) };
  },

  render: function() {
    const { userId } = this.props;
    const tasks = this.state.tasks
    .filter( (task) => task.assignedTo === userId )
    .map( (task, idx) => (
      <View key={ task.id }>
        <View style={ [sharedStyles.container, sharedStyles.row, styles.taskSeperator] }>
          <View style={ styles.textFormatter }>
            <Text
              style={ styles.firstLetter }
            >{ task.name[0].toUpperCase() }</Text>
            <Text
              onPress={ this.toggleTask(idx, task.completed) }
              style={ styles.taskTitle }
            >{ task.name.toUpperCase() }</Text>
          </View>
          <View>
            <TouchableHighlight>
              <Image style={ styles.checkbox } source={ require('../Resources/checked.png') } />
            </TouchableHighlight>
          </View>
        </View>
        <View style={ styles.divider } />
      </View>
    ));

    return (
      <View>
        <Header title='My Tasks' />
        { tasks }
        <View style={ styles.background } />
      </View>
    );
  }
})

const styles = StyleSheet.create({
  background: {
    backgroundColor: LIGHTER_GREY,
    height: 1000,
    marginTop: -2,
  },
  checkbox: {
    height: 30,
    width: 30,
  },
  divider: {
    alignSelf: 'stretch',
    borderColor: LIGHT_GREY,
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  firstLetter: {
    color: DARK_GREY,
    fontSize: 24,
    fontWeight: '800',
    paddingRight: 20,
  },
  taskTitle: {
    fontSize: 20,
    letterSpacing: 1.5,
  },
  taskSeperator: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textFormatter: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

const mapStateToProps = (state) => ({
  roomId: state.roomId,
  userId: state.user.id,
});

export default connect(mapStateToProps)(Todos);
