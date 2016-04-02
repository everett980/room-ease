import React, {Component} from 'react';
//import Helmet from 'react-helmet';
import { MiniInfoBar } from 'components';
import Firebase from 'firebase';

const firebaseRef = new Firebase('https://room-ease.firebaseio.com/');

export default class Signup extends Component {
	/* loginPrompt() {
		firebaseRef.authWithOAuthPopup("google", function(error, authData) {
			if (error) {
				console.log('Login Failed!', error);
			} else {
				console.log('Authenticated successfully with payload:', authData);
			}
		});
	} */
	render() {
		return (
				<div>
					<h1>Sign up</h1>
				</div>
			   );
	}
}
