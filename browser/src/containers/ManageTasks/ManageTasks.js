import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { MiniInfoBar, TaskDeleter, AddTask } from 'components';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Firebase from 'firebase';
import { setEmail, setRoomId, setMemberId } from '../../redux/modules/userData';
import { openModal, closeModal } from '../../redux/modules/modalCtrl';
const Modal = require('react-modal');

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
		outerList = this.monthlyTasks.filter(task => task).map((task) => <TaskDeleter task={task} roomId={this.props.userRoomId}/>);
		this.forceUpdate();
	}
	render() {
		return (
				<div>
				<h1>Manage Tasks</h1>
				{outerList}
				<button style={ {clear: 'both'} } onClick={this.props.openModal}>Add +</button>
				<Modal isOpen={this.props.open} onRequestClose={this.props.closeModal}><AddTask roomId={this.props.userRoomId}/></Modal>
				</div>
			   );
	}
}
function mapStateToProps(state) {
	return {
		userEmail: state.userData.userEmail,
		userMemberId: state.userData.userMemberId,
		userRoomId: state.userData.userRoomId,
		open: state.modalCtrl.open
	}
}
function mapDispatchToProps(dispatch) {
	return {
		openModal: () => {
					   dispatch(openModal());
		},
		closeModal: () => {
						dispatch(closeModal());
					}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageTasks);
