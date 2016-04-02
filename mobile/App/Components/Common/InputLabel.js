import React, {
  StyleSheet,
  Text,
} from 'react-native';

import { GREY } from '../../Styles/colors';

export default ({ text }) => <Text style={ styles.label }>{ text.toUpperCase() }</Text>;

const styles = StyleSheet.create({
  label: {
    color: GREY,
    fontSize: 14,
    letterSpacing: 2,
    marginBottom: 5,
  }
})
