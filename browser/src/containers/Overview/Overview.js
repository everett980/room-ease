import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { MiniInfoBar, Task } from 'components';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Firebase from 'firebase';
import { setEmail, setRoomId, setMemberId } from '../../redux/modules/userData';

const firebaseRef = new Firebase('https://room-ease.firebaseio.com/');

let outerList;
class Overview extends Component {
	componentWillMount() {
		this.personal = true;
		fetch(`https://room-ease.firebaseio.com/rooms/${this.props.userRoomId}/thisMonthsTasks/.json`).then((res) => res.json()).then(tasks => {
			this.tasks = tasks;
		return fetch(`https://room-ease.firebaseio.com/rooms/${this.props.userRoomId}/members/.json`).then((res) => res.json())
	}).then((members) => {
		this.members = members;
		return;
	}).then(() => {
		::this.makeList();
	});
	}
	togglePersonal() {
		console.log('before', this.personal);
		this.personal = !this.personal;
		console.log('after', this.personal);
		this.makeList();
	}

	makeList() {
		console.log(this.props.userMemberId);
		outerList = this.tasks.filter((task) => task)
			.filter((task) => {return ((task.assignedTo === this.props.userMemberId) === this.personal)})
			.filter((task) => {
				return ((Date.parse(task.startDate) < new Date().getTime()) && (Date.parse(task.endDate) > new Date().getTime()));
			})
			.map((task) => <Task task={task} members={this.members} mine={this.personal}/>);
		console.log(outerList);
		console.log('making list');
		outerList = outerList;
		this.forceUpdate();
		console.log(Date.parse(this.tasks[0].startDate));
	}
	render() {
		console.log(outerList);
		return (
				<div>
				<h1>{this.personal ? 'Your Tasks' : 'Other\'s Task'}</h1>
				<button onClick={::this.togglePersonal}>{this.personal ? 'View Other\'s Tasks' : 'View Your Tasks'}</button>
				{outerList}
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

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
