import React, { Component } from 'react';
const helpers = require('../../firebaseStore2.js');

export default class Purchase extends Component {
	acceptMe() {
		console.log('will use the following id to accept the trade: ', this.props.trade.id);
		helpers.acceptATrade(this.props.roomId, this.props.trade.id);
	}
	rejectMe() {
		console.log('will use the following id to reject the trade: ', this.props.trade.id);
		helpers.removeATrade(this.props.roomId, this.props.trade.id);
	}
	cancelMe() {
		console.log('will use the following id to cancel the trade: ', this.props.trade.id);
		helpers.removeATrade(this.props.roomId, this.props.trade.id);
	}
	render() {
		this.initiatorTasksAsString = this.props.trade.tasksForInitiator.map(taskId => ""+this.props.tasks[taskId].name+" by "+this.props.tasks[taskId].endDate).join(", ");
		this.recipientTasksAsString = this.props.trade.tasksForRecipient.map(taskId => ""+this.props.tasks[taskId].name+" by "+this.props.tasks[taskId].endDate).join(", ");
		const cancelButton = (this.props.viewerIsSender) ? <button onClick={::this.cancelMe}>Cancel</button> : '';
		const rejectButton = (!this.props.viewerIsSender) ? <button onClick={::this.rejectMe}>Reject</button> : '';
		const acceptButton = (!this.props.viewerIsSender) ? <button onClick={::this.acceptMe}>Accept</button> : '';
	return (
			<div style={ {border: "1px solid black"} }>
			<p>{this.props.viewerIsSender ? 'You' : this.props.members[this.props.trade.initiator].name} will have to do these tasks: {this.initiatorTasksAsString}</p>
			<p>{!this.props.viewerIsSender ? 'You' : this.props.members[this.props.trade.recipient].name} will have to do these tasks: {this.recipientTasksAsString}</p>
			{cancelButton}
			{acceptButton}
			{rejectButton}
			</div>
		   )
}
}

