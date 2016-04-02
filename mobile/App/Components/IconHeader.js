import React, {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import sharedStyles from '../Styles';

export default ({ title }) => (
  <View style={ [sharedStyles.center, styles.header] }>
    <Image
      source={ require('../Resources/logo.png') }
      style={ sharedStyles.logo }/>
    <Text style={ [sharedStyles.h1] }>{ title }</Text>
  </View>
)

const styles = StyleSheet.create({
  header: {
    marginBottom: 60,
  },
})
