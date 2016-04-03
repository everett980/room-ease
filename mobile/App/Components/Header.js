import React, {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { store } from '../Data';

import sharedStyles from '../Styles';
import { DARK_GREY, GREY, LIGHT_GREY } from '../Styles/colors';

const pressUps = () => { console.log('OI'); store.dispatch({ type: 'TOGGLE_MENU' }) };

let Header = ({ title, toggleMenu }) => (
  <View>
    <View style={ [sharedStyles.container, styles.container] }>
      <TouchableHighlight
        onPress={ toggleMenu }
        style={ [styles.menuIconContainer] }
        underlayColor='transparent' >
        <Image
          source={ require('../Resources/menu-icon.png') }
        />
      </TouchableHighlight>
      <View style={ styles.leftAlign }>
        <Text style={ styles.title } >{ title }</Text>
      </View>
    </View>
    <View style={ styles.divider } />
  </View>
);

const mapDispatchToProps = (dispatch) => ({
  toggleMenu: () => { console.log('OI'); dispatch({ type: 'TOGGLE_MENU' }) },
});

export default connect(null, mapDispatchToProps)(Header);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divider: {
    alignSelf: 'stretch',
    borderColor: LIGHT_GREY,
    borderWidth: .5,
    flex: 1,
  },
  leftAlign: {
    alignItems: 'center',
    paddingRight: 40,
    flex: 1,
  },
  menuIconContainer: {
    alignSelf: 'stretch',
    padding: 5,
  },
  title: {
    color: DARK_GREY,
    fontSize: 22,
    letterSpacing: 0.5,
    paddingLeft: 10,
  }
})
