import React, {Component} from 'react';
import { connect } from 'react-redux';
import { setName, setFrequency, reset } from '../../redux/modules/AddTask';
import { closeModal } from '../../redux/modules/modalCtrl';

const helperfns = require('../../firebaseStore2.js');

class AddTask extends Component {
	setName(e) {
		console.log(e.target.value);
		this.props.setName(e.target.value);
	}
	setFrequency(e) {
		console.log(e.target.value);
		this.props.setFrequency(e.target.value);
	}
	submit() {
		console.log(this.props.roomId);
		helperfns.createATask(this.props.roomId, {frequency: +this.props.frequency, name: this.props.name});
		this.props.reset();
		this.props
	}
	render() {
		return (
				<div>
				<input type='text' onChange={::this.setName}/>
				<input type='text' onChange={::this.setFrequency}/>
				<button onClick={::this.submit}>Add Task</button>
				</div>
		)
	}
}
function mapStateToProps(state) {
	return {
		name: state.addTask.name,
		frequency: state.addTask.frequency
	}
}
function mapDispatchToProps(dispatch) {
	return {
		setName: (name) => {
					 dispatch(setName(name));
			},
		setFrequency: (frequency) => {
						  dispatch(setFrequency(frequency));
			},
		reset: () => {
				   dispatch(reset());
				  },
		close: () => {
				   dispatch(closeModal());
				 }
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
