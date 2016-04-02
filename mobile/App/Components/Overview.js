import React, {
  Component,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import Firebase from 'firebase';

import sharedStyles from '../Styles';

const mapStateToProp = (state) => ({
  name: state.user.name,
  profilePicture: state.user.profilePicture
})

class Overview extends Component {
  render() {
    const { name, profilePicture } = this.props;
    console.log(profilePicture)
    return (
      <View>
        <Text>Wazzup, { name.split(' ')[0] }</Text>
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
