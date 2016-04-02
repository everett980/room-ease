const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ROOM_ID': {
      return { ...state, roomId: action.roomId }
    }
    case 'SET_USER': {
      return { ...state, user: action.user }
    }
  };
}
