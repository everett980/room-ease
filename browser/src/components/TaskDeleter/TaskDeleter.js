import React, { Component } from 'react';

export default class TaskDeleter extends Component {
	deleteMe() {
		console.log('will use the following id to delete in the future: ', this.props.task.id);
	}
	render() {
		return (
				<div style={ {border: "1px solid black", clear: 'both', width: '60%'} }>
					<p style={ {float: 'left'} }>{this.props.task.name}</p>
					<button style={ {float: 'right'} } onClick={::this.deleteMe}>Delete</button>
				</div>
			   );
	}
}

