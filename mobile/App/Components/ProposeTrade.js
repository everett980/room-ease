import React, {
  Component,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import Firebase from 'firebase';
import moment from 'moment';
import { connect } from 'react-redux';
import ReactFireMixin from 'reactfire';

import Header from './Header';
import InputLabel from './Common/InputLabel';
import Tasks from './Tasks';

import store from '../Data';
import sharedStyles from '../Styles';
import {
  BLUE,
  DARK_BLUE,
  DARK_GREY,
  GREEN,
  GREY,
  LIGHT_BLUE,
  LIGHTER_GREY,
  RED,
} from '../Styles/colors';

class Step1 extends Component {
  constructor(props) {
    super(props);
  }

  go() {
    this.props.navigator.push({ component: Step2, props: { recipientId: this.state.selectedPerson } });
  }

  selectPerson(id) {
    return () => { this.setState({ selectedPerson: id }); };
  }

  render() {
    const selectedPerson = (this.state) ? this.state.selectedPerson : '';

    members = this.props.members.map( (member, idx) => (
      <Text
        key={ idx }
        onPress={ this.selectPerson(member.id) }
        style={ selectedPerson === member.id ? [styles.personButton, styles.personButtonSelected] : styles.personButton } >
        { member.name.toUpperCase() }
      </Text>
    ));

    return (
      <View style={ [sharedStyles.longHack] }>
        <View style={ styles.container }>
          <Header title='Trade Proposal' />
          <View style={ styles.spaceTradeWith } />
            <InputLabel text='Trade With' />
            <View style={ styles.personButtonsContainer }>
              { members }
            </View>
        </View>
        <View style={ sharedStyles.row, styles.nextBtnContainer } >
          <Text onPress={ this.go } style={ styles.nextBtn }>NEXT</Text>
        </View>
      </View>
    );
  }
}

const mapStep1StateStateToProps = (state) => ({
  roomId: state.roomId,
  user: state.user,
  members: state.members,
})

const Step2 = React.createClass({
  componentWillMount() {

  },

  render() {
    return (
      <View>

      </View>
    )
  }
});

const styles = StyleSheet.create({
  nextBtn: {
    backgroundColor: BLUE,
    color: 'white',
    flex: 1,
    fontSize: 36,
    justifyContent: 'center',
    height: 100,
    marginTop: 150,
    textAlign: 'center',
  },
  personButton: {
    borderColor: BLUE,
    borderWidth: 1,
    color: BLUE,
    fontSize: 16,
    letterSpacing: 2,
    padding: 10,
    marginBottom: 30,
    textAlign: 'center',
    width: 250,
  },
  personButtonsContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  personButtonSelected: {
    backgroundColor: BLUE,
    color: 'white',
  },
  spaceTradeWith: {
    paddingTop: 50
  },
});


export default connect(mapStep1StateStateToProps)(Step1);
