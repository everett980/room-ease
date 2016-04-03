const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ROOM_ID': {
      return { ...state, roomId: action.roomId }
    }
    case 'SET_MEMBERS': {
      return { ...state, members: action.members }
    }
    case 'SET_RENT_DUE_DATE': {
      return { ...state, rentDueDate: action.rentDueDate }
    }
    case 'SET_USER': {
      return { ...state, user: action.user }
    }
    case 'TOGGLE_MENU': {
      return { ...state, isMenuOpen: !state.isMenuOpen }
    }
  };
}
