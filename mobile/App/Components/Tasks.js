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
  GREY,
  LIGHT_GREY,
  LIGHTER_GREY,
} from '../Styles/colors';

const Tasks = React.createClass({
  mixins: [ReactFireMixin],

  componentWillMount: function() {
    const { roomId } = this.props;

    const ref = new Firebase(`https://room-ease.firebaseio.com/rooms/${roomId}/thisMonthsTasks`);
    this.bindAsArray(ref, 'tasks');
  },

  toggleTask: function(task) {
    return () => {
      console.log('toggling')
      this.firebaseRefs.tasks.child(task.id).update({ completed: !task.completed })
    };
  },

  render: function() {
    const { userId } = this.props;
    const tasks = this.state.tasks
    .sort( (a, b) => a.endDate > b.endDate )
    .filter( (task) => task.assignedTo === userId )
    .sort( (a, b) => a.completed ? 1 : -1 )
    .map( (task, idx) => {
      const checkbox = (task.completed) ? 'checked' : 'unchecked';
      const imageUrl = '../Resources/unchecked@2x.png';

      return (
        <View key={ idx }>
          <View style={ [sharedStyles.container, sharedStyles.row, styles.taskSeperator] }>

            <View style={ styles.textFormatter }>
              <Text
                style={ styles.firstLetter }
              >{ task.name[0].toUpperCase() }</Text>
              <Text
                onPress={ this.toggleTask(task) }
                style={ (task.completed ) ? [styles.taskTitle, styles.completed] : styles.taskTitle }
              >{ task.name.toUpperCase() }</Text>
            </View>

            <View>
              <TouchableHighlight>
                <Image
                  onPress={ this.toggleTask(task) }
                  style={ styles.checkbox }
                  source={
                    task.completed
                    ?
                      require('../Resources/checked.png')
                    :
                      require('../Resources/unchecked.png')
                  }
                />
              </TouchableHighlight>
            </View>

          </View>

          <View style={ [sharedStyles.container, styles.dateContainer] }>
            <Text style={ styles.date }>By { moment(task.endDate).format('M/D') }</Text>
          </View>

          <View style={ styles.divider } />
        </View>
      )}
    );

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
  completed: {
    textDecorationColor: 'black',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  date: {
    fontSize: 13,
    fontWeight: '300',
  },
  dateContainer: {
    marginTop: -42,
    marginLeft: 63,
    width: 100,
  },
  divider: {
    alignSelf: 'stretch',
    borderColor: LIGHT_GREY,
    borderWidth: .5,
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
    fontWeight: '300',
    letterSpacing: 1.5,
  },
  taskSeperator: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 30,
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

export default connect(mapStateToProps)(Tasks);
