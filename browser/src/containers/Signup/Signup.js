import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { MiniInfoBar } from 'components';
import Firebase from 'firebase';

const firebaseRef = new Firebase('https://room-ease.firebaseio.com/');

export default class Signup extends Component {
	signin() {
		firebaseRef.authWithOAuthPopup("google", function(error, authData) {
			if (error) {
				console.log("Login Failed!", error);
			} else {
				console.log("Authenticated successfully with payload:", authData);
			}
		});
	}
	render() {
		return (
				<div>
				<h1>Signup</h1>
				<button onClick={this.signin}>Sign in</button>
				</div>
			   );
	}
}
