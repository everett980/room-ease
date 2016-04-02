import React, {
  createElement,
  Image,
  Navigator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Provider } from 'react-redux';

import Header from './Header';
import InputLabel from './Common/InputLabel';
import SignIn from './SignIn';

import store from '../Data';
import sharedStyles from '../Styles';

const renderScene = (scene, navigator) => {
  const { component } = scene;
  const rendered =  (component) ? createElement(component, { navigator }) : '';

  return (
    <Provider store={store}>
      <View style={ [sharedStyles.fullWidth, sharedStyles.center] }>
        { rendered }
      </View>
    </Provider>
  );
};

const App = () => (
  <Navigator
    initialRoute={{ component: SignIn }}
    renderScene={ renderScene }
  />
)

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  space: {
    marginBottom: 20,
  }
})

export default App;
