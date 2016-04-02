import React, {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import sharedStyles from '../Styles';
import { GREY } from '../Styles/colors';

export default ({ title }) => (
  <View style={ [styles.container, sharedStyles.test] }>
    <Image style={ sharedStyles.test } source={ require('../Resources/menu-icon.png') } />
    <Text style={ sharedStyles.test } >{ title }</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})
