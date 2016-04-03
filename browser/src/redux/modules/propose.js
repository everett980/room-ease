const SET_RECIPIENT = 'setRecipient';
const SET_INITIATOR_TASKS = 'setInitiatorTasks';
const SET_RECIPIENT_TASKS = 'setRecipientTasks';
const SET_INITIATOR_ADD_TO_RENT = 'addToRent';
const RESET = 'reset';

const initialState = {
	recipientId: '',
	initiatorTasks: [],
	recipientTasks: [],
	initiatorRentIncrease: 0
}

export default function reducer(state = initialState, action = {}) {
	switch(action.type) {
		case SET_RECIPIENT:
			return {
				...state,
				recipientId: action.recipientId
			}
		case SET_INITIATOR_TASKS:
			return {
				...state,
				initiatorTasks: action.initiatorTasks
			}
		case SET_RECIPIENT_TASKS:
			return {
				...state,
				recipientTasks: action.recipientTasks
			}
		case SET_INITIATOR_ADD_TO_RENT:
			return {
				...state,
				initiatorRentIncrease: action.initiatorRentIncrease
			}
		case RESET:
			return initialState;
		default:
			return state;
	}
}
export function setRecipient(id) {
	return {
		type: SET_RECIPIENT,
		recipientId: id
	}
}
export function setInitiatorTasks(tasks) {
	return {
		type: SET_INITIATOR_TASKS,
		initiatorTasks: tasks
	}
}
export function setRecipientTasks(tasks) {
	return {
		type: SET_RECIPIENT_TASKS,
		recipientTasks: tasks
	}
}
export function setInitiatorRentIncrease(money) {
	return {
		type: SET_INITIATOR_ADD_TO_RENT,
		initiatorRentIncrease: money
	}
}
export function reset() {
	return {
		type: RESET
	}
}
