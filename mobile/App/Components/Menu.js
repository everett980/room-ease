import React, {
  Component,
  Image,
  StyleSheet,
  Text,
  View,
  createElement
} from 'react-native';

import { connect } from 'react-redux';
import { store } from 'redux';
import SideMenu from 'react-native-side-menu';

import Overview from './Overview';

import sharedStyles from '../Styles';
import {
  BLUE,
  DARK_BLUE,
  SLIGHTLY_DARKER_BLUE
} from '../Styles/colors';

const MENU_WIDTH = 280;

const mapStateToProp = (state) => ({
  name: state.user.name,
  profilePicture: state.user.profilePicture
})

const go = (navigator, location) => () => {
  const locationToComponent = {
    'Home': Overview,
    'My Trades': Overview,
    'My Tasks': Overview,
    'Communal Tasks': Overview,
    'Make New Trade': Overview,
  }
  const component = locationToComponent[location];

  navigator.push({ component });
}

const locations = [
  'Home',
  'My Trades',
  'My Tasks',
  'Communal Tasks',
  'Make New Trade'
];

let MenuContents = ({ name, navigator, profilePicture }) => {

  const menuItems = locations.map( (location) => (
      <View key={ location }>
        <Text onPress={ go(navigator, location) } style={ styles.menuItem }>{ location.toUpperCase() }</Text>
        <View style={ styles.divider } />
      </View>
  ));

  return (
    <View style={ [styles.container, sharedStyles.test]} >
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

const mapMenuContentStateToProps = (state) => ({
  name: state.user.name,
  profilePicture: state.user.profilePicture,
});

MenuContents = connect(mapMenuContentStateToProps)(MenuContents);

const mapMenuStateToProps = (state) => ({ isMenuOpen: state.isMenuOpen });

let Menu = ({ navigator, children, isMenuOpen }) => {
  return (
    <SideMenu
      isOpen={ isMenuOpen }
      menu={ createElement(MenuContents, { navigator }, null) }
    >
      { children }
    </SideMenu>
  )
}

Menu = connect(mapMenuStateToProps)(Menu);

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'center',
    width: MENU_WIDTH,
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
    color: DARK_BLUE,
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

export default Menu;
