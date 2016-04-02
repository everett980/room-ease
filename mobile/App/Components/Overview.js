import React, {
  Component,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import Firebase from 'firebase';

import Header from './Header';

import sharedStyles from '../Styles';

const mapStateToProp = (state) => ({
  name: state.user.name,
  profilePicture: state.user.profilePicture
})

class Overview extends Component {
  render() {
    const { name, profilePicture, navigator } = this.props;
    return (
      <View style={ styles.temp }>
        <Header title='Yestynn / Notynn / Manytynn' />
        <Image style={ styles.profilePicture } source={{ uri: profilePicture }} />
        <Text>Wazzup, { name.split(' ')[0] }</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  temp: {
    alignItems: 'stretch',
    flex: 1,
  }
})

export default connect(mapStateToProp, null)(Overview);
