import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { MiniInfoBar, Trade, AddProposal } from 'components';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Firebase from 'firebase';
import { setEmail, setRoomId, setMemberId } from '../../redux/modules/userData';
import { openModal, closeModal } from '../../redux/modules/modalCtrl';
const Modal = require('react-modal');

const firebaseRef = new Firebase('https://room-ease.firebaseio.com/');

let outerList;
class Proposals extends Component {
	componentWillMount() {
		this.viewingReceived = true;
		fetch(`https://room-ease.firebaseio.com/rooms/${this.props.userRoomId}/proposedTrades/.json`).then(res => res.json()).then((proposedTrades) => {
			const filtered = proposedTrades.filter(trade => trade);
			this.yourPendingOffers = filtered.filter(trade => trade.initiator === this.props.userMemberId);
			this.offersForUser = filtered.filter(trade => trade.recipient === this.props.userMemberId);
			return fetch(`https://room-ease.firebaseio.com/rooms/${this.props.userRoomId}/members/.json`);
		}).then(res => res.json()).then(members => {
			this.members = members;
			return fetch(`https://room-ease.firebaseio.com/rooms/${this.props.userRoomId}/thisMonthsTasks/.json`)
		}).then(res => res.json()).then(tasks => {
			this.tasks = tasks;
			::this.makeList();
		})
	}
	makeList() {
		const displayTrades = this.viewingReceived ? this.offersForUser : this.yourPendingOffers;
		console.log(this.members);
		console.log(this.tasks);
		outerList = displayTrades.map(trade => <Trade trade={trade} members={this.members} tasks={this.tasks} viewerIsSender={!this.viewingReceived} roomId={this.props.userRoomId}/>);
		this.forceUpdate();
	}
	toggleViewingReceived() {
		this.viewingReceived = !this.viewingReceived;
		::this.makeList();
	}
	render() {
		return (
				<div>
				<h1>Proposals You've {this.viewingReceived ? 'Received' : 'Sent'}</h1>
				<button onClick={::this.toggleViewingReceived}>View {this.viewingReceived ? 'Sent' : 'Received'} Proposals</button>
				{outerList}
				<button onClick={this.props.openModal}>Propose New Trade</button>
				<Modal isOpen={this.props.open} onRequestClose={this.props.closeModal}><AddProposal roomId={this.props.userRoomId} initiatorId={this.props.userMemberId}/></Modal>
				</div>
			   )
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

export default connect(mapStateToProps, mapDispatchToProps)(Proposals);
