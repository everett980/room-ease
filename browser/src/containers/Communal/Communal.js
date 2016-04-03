import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { MiniInfoBar, Purchase } from 'components';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Firebase from 'firebase';
import { setEmail, setRoomId, setMemberId } from '../../redux/modules/userData';

const firebaseRef = new Firebase('https://room-ease.firebaseio.com/');

let outerList;
class Communal extends Component {
	componentWillMount() {
		fetch(`https://room-ease.firebaseio.com/rooms/${this.props.userRoomId}/communalPurchases/.json`).then(res => res.json()).then(res => this.communalPurchases = res).then(() => {
		return fetch(`https://room-ease.firebaseio.com/rooms/${this.props.userRoomId}/members/.json`).then((res) => res.json())
	}).then((members) => {
		this.members = members;
		return;
	}).then(() => {
			::this.makeList();
	});
	}
	makeList() {
		console.log(this.communalPurchases);
		outerList = this.communalPurchases.filter((purchase) => purchase).map((purchase) => <Purchase purchase={purchase} members={this.members} mine={this.props.userMemberId === purchase.purchaser} contestorId={this.props.userMemberId} roomIndex={this.props.userRoomId}/>);
		this.forceUpdate();
	}
	render() {
		return (
				<div>
				<h1>Communal Purchases</h1>
				{outerList}
				<button>Add +</button>
				</div>
			   );
	}
}
function mapStateToProps(state) {
	return {
		userEmail: state.userData.userEmail,
		userMemberId: state.userData.userMemberId,
		userRoomId: state.userData.userRoomId
	}
}
function mapDispatchToProps(dispatch) {
	return {
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Communal);
