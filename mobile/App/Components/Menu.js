import React, {
  Component,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { connect } from 'react-redux';

import MenuWrapper from 'react-native-side-menu';

import sharedStyles from '../Styles';

const mapStateToProp = (state) => ({
  name: state.user.name,
  profilePicture: state.user.profilePicture
})

const go = (navigator, location) => {
  const locationToComponent = {

  }
  navigator.push(locationToComponent[location]);
}

const locations = [
  'Home',
  'My Trades',
  'My Tasks',
  'Communal Tasks',
  'Make New Trade'
].map( (location) => location.toUpperCase() );

const MenuContents = ({ navigator }) => {
  const menuItems = locations.map( (location) => (
    <View>
      <Text>{ location }</Text>
    </View>
  ))
  return (
    <View>
      { menuItems }
    </View>
  );
}


class Overview extends Component {
  render() {
    const { name, profilePicture } = this.props;
    console.log(profilePicture)
    return (
      <View>
        <Text>Wazzup, { name.split(' ')[0 ] }</Text>
        <Image style={ styles.profilePicture } source={{ uri: profilePicture }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  profilePicture: {
    alignSelf: 'center',
    borderRadius: 50,
    height: 100,
    width: 100,
  }
})

export default connect(mapStateToProp, null)(Overview);
