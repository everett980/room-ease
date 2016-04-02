import React, { Component } from 'react';

export default class Task extends Component {
	render() {
		return (
				<div style={ {border: "1px solid black"} }>
					<p>{this.props.task.name}</p>
					<p>{this.props.mine ? 'You' : this.props.members[this.props.task.assignedTo].name} - {this.props.task.endDate.split('-')[1]}/{this.props.task.endDate.split('-')[2].split('T')[0]} @ {this.props.task.endDate.split('T')[1].split(':')[0]}:{this.props.task.endDate.split('T')[1].split(':')[1]}</p>
				</div>
			   );
	}
}

