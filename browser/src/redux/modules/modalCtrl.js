const SET_OPEN = 'setOpen';
const SET_CLOSED = 'setClosed';

const initialState = {
	open: false
}

export default function reducer(state = initialState, action = {}) {
	switch(action.type) {
		case SET_OPEN:
			console.log('opening modal');
			return {
				...state,
				open: true
			}
		case SET_CLOSED:
			console.log('closing modal');
			return {
				...state,
				open: false
			}
		default:
			return state;
		}
}

export function openModal() {
	return {
		type: SET_OPEN
	}
}
export function closeModal() {
	return {
		type: SET_CLOSED
	}
}
