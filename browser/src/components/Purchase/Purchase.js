import React, { Component } from 'react';

export default class Purchase extends Component {
	disputeMe() {
		console.log('will use the following id to dispute in the future: ', this.props.purchase.id);
	}
	cancelMe() {
		console.log('will use the following id to cancel in the future: ', this.props.purchase.id);
	}
	render() {
		return (
				<div style={ {border: "1px solid black", clear: 'both', width: '60%'} }>
				<p>{this.props.purchase.item}</p>
				<p>{this.props.purchase.price}</p>
				<p>{this.props.purchase.date}</p>
				<p>{this.props.mine ? 'You' : this.props.members[this.props.purchase.purchaser].name}</p>
				<button onClick={this.props.mine ? ::this.cancelMe : ::this.disputeMe}>{this.props.mine ? 'Cancel' : 'Dispute'}</button>
				</div>
			   );
	}
}

