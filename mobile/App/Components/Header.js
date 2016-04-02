import React, {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { store } from '../Data';

import sharedStyles from '../Styles';
import { GREY } from '../Styles/colors';

const pressUps = () => { console.log('OI'); store.dispatch({ type: 'TOGGLE_MENU' }) };

let Header = ({ title }) => (
  <View onPress={ pressUps } style={ [styles.container, sharedStyles.test] }>
    <Image
      onPress={ pressUps }
      source={ require('../Resources/menu-icon.png') }
      style={ sharedStyles.test }
    />
    <Text style={ styles.title } >{ title }</Text>
  </View>
);

const mapDispatchToProps = (dispatch) => ({
  toggleMenu: () => { console.log('OI'); dispatch({ type: 'TOGGLE_MENU' }) },
});

export default connect(null, mapDispatchToProps)(Header);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: GREY,
    fontSize: 18,
    letterSpacing: 0.5,
    paddingLeft: 10,
  }
})
