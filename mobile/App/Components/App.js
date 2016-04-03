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

import Menu from './Menu';
import SignIn from './SignIn';

import store from '../Data';
import sharedStyles from '../Styles';

const configureScene = (route, routeStack) => Navigator.SceneConfigs.HorizontalSwipeJump;

const renderScene = (scene, navigator) => {
  const { component, showMenu = true } = scene;
  let rendered =  (component) ? createElement(component, { navigator }) : '';

  if (showMenu) rendered = (
    <Menu navigator={ navigator }>
      <View style={ styles.background }>
        { rendered }
      </View>
    </Menu>
  );

  return (
    <Provider store={ store }>
      <View style={ [sharedStyles.fullWidth, styles.container] }>
        { rendered }
      </View>
    </Provider>
  );
};

const App = () => (
  <Navigator
    configureScene={ configureScene }
    initialRoute={{ component: SignIn, showMenu: false }}
    renderScene={ renderScene }
  />
)

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
  },
  container: {
    paddingTop: 20,
  },
  space: {
    marginBottom: 20,
  }
})

export default App;
