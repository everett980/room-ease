import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { MiniInfoBar } from 'components';
import Firebase from 'firebase';
import { setEmail, setRoomId, setMemberId } from '../../redux/modules/userData';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

const firebaseRef = new Firebase('https://room-ease.firebaseio.com/');

class Signup extends Component {
	signin() {
		firebaseRef.authWithOAuthPopup("google", (error, authData) => {
			if (error) {
				console.log("Login Failed!", error);
			} else {
				//console.log("Authenticated successfully with payload:", authData);
				this.props.setEmail(authData.google.email);
				::this.setRoomId();
			}
		},
		{
			scope: 'email'
		});
	}
	setRoomId() {
		console.log('about to fetch');
		fetch(`https://room-ease.firebaseio.com/googleIds/${this.props.userEmail.split('@')[0]}/.json`).then(res => res.json()).then(res => {
			console.log(res);
			return this.props.setRoomId(res);
	}).then(() => {
		if (this.props.userRoomId !== null) ::this.setMemberId();
		else browserHistory.push('/joinroom');
	})
	}
	setMemberId() {
		fetch(`https://room-ease.firebaseio.com/rooms/${this.props.userRoomId}/members/.json`).then(res => res.json()).then(members => {
			return this.props.setMemberId(members.filter((member) => { return !(member.email.localeCompare(this.props.userEmail)) })[0].id);
	}).then(() => { browserHistory.push('/overview') });
	}
	render() {
		return (
				<div>
				<h1>Signup</h1>
				<button onClick={::this.signin}>Sign in</button>
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
		setEmail: (email) => {
						 dispatch(setEmail(email));
					 },
		setRoomId: (roomId) => {
						 dispatch(setRoomId(roomId));
					 },
		setMemberId: (MemberId) => {
						 dispatch(setMemberId(MemberId));
					 }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
