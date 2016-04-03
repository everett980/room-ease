import React, {Component} from 'react';
import { connect } from 'react-redux';
import { setRecipient, setInitiatorTasks, setRecipientTasks, setInitiatorRentIncrease, reset } from '../../redux/modules/propose';
import { closeModal } from '../../redux/modules/modalCtrl';

const helperfns = require('../../firebaseStore2.js');

class AddProposal extends Component {
	setRecipient(e) {
		this.props.setRecipient(e.target.value);
	}
	setInitiatorTasks(e) {
		this.props.setInitiatorTasks(e.target.value.split(','));
	}
	setRecipientTasks(e) {
		this.props.setRecipientTasks(e.target.value.split(','));
	}
	setInitiatorRentIncrease(e) {
		this.props.setInitiatorRentIncrease(e.target.value);
	}
	submit() {
		console.log(+this.props.roomId, +this.props.initiatorId, +this.props.recipientId, this.props.initiatorTasks, this.props.recipientTasks, this.props.initiatorRentIncrease);
		helperfns.createATradeProposal(+this.props.roomId, +this.props.initiatorId, +this.props.recipientId, this.props.initiatorTasks, this.props.recipientTasks, this.props.initiatorRentIncrease);
		this.props.reset();
		this.props.close();
	}
	render() {
		return (
				<div>
				<br/><br/>
				ID of recipient: <input type='text' onChange={::this.setRecipient}></input><br/>
				Comma deliminated list of tasks for initiator, no spaces: <input type='text' onChange={::this.setInitiatorTasks}></input><br/>
				Comma deliminated list of tasks for recipient, no spaces: <input type='text' onChange={::this.setRecipientTasks}></input><br/>
				Amount of money initiator pays, negative number means recipient would pay: <input type='text' onChange={::this.setInitiatorRentIncrease}></input><br/>
				<button onClick={::this.submit}>Submit</button>
				</div>
			   )
	}
}
function mapStateToProps(state) {
	return {
		recipientId: state.propose.recipientId,
		initiatorTasks: state.propose.initiatorTasks,
		recipientTasks: state.propose.recipientTasks,
		initiatorRentIncrease: state.propose.initiatorRentIncrease
	}
}
function mapDispatchToProps(dispatch) {
	return {
		setRecipient: (id) => {
						  dispatch(setRecipient(id));
					  },
		setInitiatorTasks: (tasks) => {
							   dispatch(setInitiatorTasks(tasks))
						   },
		setRecipientTasks: (tasks) => {
							   dispatch(setRecipientTasks(tasks))
						   },
		setInitiatorRentIncrease: (money) => {
									  dispatch(setInitiatorRentIncrease(money))
								  },
		reset: () => {
				   dispatch(reset())
			   },
		close: () => {
				   dispatch(closeModal())
			}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(AddProposal);
