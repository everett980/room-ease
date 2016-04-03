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
  LIGHT_BLUE,
  LIGHTER_GREY,
} from '../Styles/colors';

const Trades = React.createClass({
  mixins: [ReactFireMixin],

  componentWillMount: function() {
    const { roomId } = this.props;

    const ref = new Firebase(`https://room-ease.firebaseio.com/rooms/${roomId}/proposedTrades`);
    this.bindAsArray(ref, 'trades');
  },

  render: function() {
    const { members, userId } = this.props;
    const trades = this.state.trades
    .filter( (trade) => trade )
    .filter( (trade) => trade.recipient === userId )
    .map( (trade, idx) => {
      const initiator = members[trade.initiator];

      return (
        <View key={ idx } style={ [sharedStyles.container, sharedStyles.longHack] }>
          <View style={ styles.card }>
            <View style={ sharedStyles.row }>
              <Image
                source={{ uri: initiator.profilePicture }}
                style={ styles.profilePicture }
              />
              <View style={ [sharedStyles.column , styles.namesContainer] }>
                <View style={ [sharedStyles.row] }>
                  <Text style={ [styles.header, styles.push] }>INITIATOR</Text>
                  <Text style={ styles.name }>{ initiator.name.toUpperCase() }</Text>
                </View>
                <View style={ [sharedStyles.row] }>
                  <Text style={ styles.header }>RECIPIENT</Text>
                  <Text style={ styles.name }>YOU</Text>
                </View>
              </View>
            </View>
            <TouchableHighlight
              style={ styles.button }
              underlayColor={ LIGHT_BLUE }
            >
              <Text style={ styles.btnText }>VIEW OFFER</Text>
            </TouchableHighlight>
          </View>
        </View>
      )
    })

    return (
      <View>
        <Header title='My Trades' />
        { trades }
      </View>
    )
  },
})

const mapStateToProps = (state) => ({
  members: state.members,
  roomId: state.roomId,
  userId: state.user.id,
})

export default connect(mapStateToProps)(Trades);

const styles = StyleSheet.create({
  btnText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    letterSpacing: 2,
  },
  button: {
    backgroundColor: LIGHT_BLUE,
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: LIGHTER_GREY,
    flexDirection: 'column',
  },
  header: {
    fontSize: 16,
    letterSpacing: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: '200',
    letterSpacing: 1,
  },
  namesContainer: {
    alignSelf: 'center',
  },
  profilePicture: {
    height: 70,
    width: 70,
  },
  push: {
    paddingRight: 20,
  }
});
