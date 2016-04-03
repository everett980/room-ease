import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { MiniInfoBar, TaskDeleter } from 'components';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Firebase from 'firebase';
import { setEmail, setRoomId, setMemberId } from '../../redux/modules/userData';

const firebaseRef = new Firebase('https://room-ease.firebaseio.com/');

let outerList;
class ManageTasks extends Component {
	componentWillMount() {
		fetch(`https://room-ease.firebaseio.com/rooms/${this.props.userRoomId}/monthlyTasks/.json`).then(res => res.json()).then(res => this.monthlyTasks = res).then(() => {
			::this.makeList();
	});
	}
	makeList() {
		console.log(this.monthlyTasks);
		outerList = this.monthlyTasks.map((task) => <TaskDeleter task={task}/>);
		this.forceUpdate();
	}
	render() {
		return (
				<div>
				<h1>Manage Tasks</h1>
				{outerList}
				<button style={ {clear: 'both'} }>Add +</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageTasks);
