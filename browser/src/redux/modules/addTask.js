const SET_NAME = 'setName';
const SET_FREQUENCY = 'setFrequency';
const RESET = 'reset';

const initialState = {
	name: '',
	frequency: 1
}

export default function reducer(state = initialState, action = {}) {
	switch(action.type) {
		case SET_NAME:
			return {
				...state,
				name: action.name
			}
		case SET_FREQUENCY:
			return {
				...state,
				frequency: action.frequency
			}
		case RESET:
			return {
				...state,
				name: '',
				frequency: 1
			}
		default:
			return state;
	}
}


export function setName(name = '') {
	return {
		type: SET_NAME,
		name
	}
}
export function setFrequency(frequency = 1) {
	return {
		type: SET_FREQUENCY,
		frequency
	}
}
export function reset() {
	return {
		type: RESET
	}
}
