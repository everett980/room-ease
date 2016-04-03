import React, {
  Component,
  Image,
  StyleSheet,
  Text,
  View,
  createElement
} from 'react-native';

import SideMenu from 'react-native-side-menu';
import { connect } from 'react-redux';

import Firebase from 'firebase';
import ReactFireMixin from 'reactfire';

import Tasks from './Tasks';
import Trades from './Trades';
import Overview from './Overview';

import store from '../Data';
import sharedStyles from '../Styles';
import {
  BLUE,
  DARK_BLUE,
  ORANGE,
  SLIGHTLY_DARKER_BLUE
} from '../Styles/colors';

const MENU_WIDTH = 280;

const mapStateToProp = (state) => ({
  name: state.user.name,
  profilePicture: state.user.profilePicture
})

const go = (navigator, location) => () => {
  const locationToComponent = {
    'My Trades': Trades,
    'My Tasks': Tasks,
    'Make New Trade': Overview,
  }
  const component = locationToComponent[location];

  store.dispatch({ type: 'TOGGLE_MENU' });

  navigator.push({ component });
}

const locations = [
  'My Tasks',
  'My Trades',
  'Make New Trade',
];

let MenuContents = React.createClass({
  mixins: [ReactFireMixin],

  componentWillMount: function() {
    const { roomId } = this.props;

    this.bindAsArray(new Firebase(`https://room-ease.firebaseio.com/rooms/${roomId}/thisMonthsTasks`), 'tasks');
    this.bindAsArray(new Firebase(`https://room-ease.firebaseio.com/rooms/${roomId}/proposedTrades`), 'trades');
  },

  render: function() {
    const { name, navigator, profilePicture, userId } = this.props;
    const numTasks = this.state.tasks
    .filter( (task) => task )
    .filter( (task) => task.assignedTo === userId )
    .length;

    const numTrades = this.state.trades
    .filter( (trade) => trade )
    .filter( (trade) => trade.recipient === userId )
    .length;

    const menuItems = locations.map( (location) => {
      const badgeCount = {
        'My Tasks': numTasks,
        'My Trades': numTrades,
      }[location];

      const badge = (badgeCount) ? <Text style={ styles.badge }>{ badgeCount }</Text> : '';
      return (
        <View key={ location } style={ sharedStyles.row }>
          <Text
            onPress={ go(navigator, location) }
            style={ styles.menuItem }
          >
            { location.toUpperCase() }
          </Text>
          { (badge) ? badge : <Text /> }
          <View style={ styles.divider } />
        </View>
      )
    });

    return (
      <View style={ [styles.container,]} >
        <View style={ styles.profileInfoContainer }>
          <Image
            source={{ uri: profilePicture }}
            style={ styles.profilePicture } />
          <Text style={ styles.name } >{ name }</Text>
        </View>
        <View style={ styles.menuItemsContainer } >
          { menuItems }
        </View>
      </View>
    );
  }
})

const mapMenuContentStateToProps = (state) => ({
  name: state.user.name,
  profilePicture: state.user.profilePicture,
  roomId: state.roomId,
  userId: state.user.id,
});

MenuContents = connect(mapMenuContentStateToProps)(MenuContents);

const mapMenuStateToProps = (state) => ({ isMenuOpen: state.isMenuOpen });

const Menu = ({ navigator, children, isMenuOpen }) => {
  const menu = <MenuContents navigator={navigator} />
  return (
    <SideMenu
      isOpen={ isMenuOpen }
      menu={ menu }
    >
      { children }
    </SideMenu>
  )
}

export default connect(mapMenuStateToProps)(Menu);

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'center',
    width: MENU_WIDTH,
  },
  badge: {
    backgroundColor: ORANGE,
    marginBottom: 15,
    marginTop: 15,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
  },
  divider: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: SLIGHTLY_DARKER_BLUE,
  },
  name: {
    color: 'white',
    fontSize: 18,
    letterSpacing: 1.5,
    marginBottom: 10,
    textAlign: 'center',
  },
  menuItem: {
    borderBottomWidth: 2,
    color: 'white',
    fontSize: 18,
    letterSpacing: 1.5,
    padding: 20,
  },
  menuItemsContainer: {
    backgroundColor: BLUE,
    height: 1000, // so hacky so naughty
  },
  profilePicture: {
    borderRadius: 25,
    height: 50,
    marginBottom: 10,
    width: 50,
  },
  profileInfoContainer: {
    alignItems: 'flex-start',
    backgroundColor: DARK_BLUE,
    padding: 20,
  },
})
