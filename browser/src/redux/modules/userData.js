const SET_USEREMAIL= 'setUserEmail';
const SET_USERMEMBERID= 'setUserMemberId';
const SET_USERROOMID= 'setUserRoomId';

const initialState = {
	userEmail: '',
	userMemberId: '',
	userRoomId: ''
}

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case SET_USEREMAIL:
			console.log('setting username');
			return {
				...state,
				userEmail: action.userEmail
			}
		case SET_USERMEMBERID:
			console.log('setting memberId');
			return {
				...state,
				userMemberId: action.userMemberId
			}
		case SET_USERROOMID:
			console.log('setting roomId');
			return {
				...state,
				userRoomId: action.userRoomId
			}
		default:
			return state;
		}
	}

export function setEmail(userEmail = '') {
	return {
		type: SET_USEREMAIL,
		userEmail
	}
}
export function setRoomId(userRoomId = '') {
	return {
		type: SET_USERROOMID,
		userRoomId
	}
}
export function setMemberId(userMemberId = '') {
	return {
		type: SET_USERMEMBERID,
		userMemberId
	}
}
