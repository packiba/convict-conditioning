import {RESET_USER, SET_USER} from '../actions/types'

const initialState = {
  name: 'чемпион',
  email: '',
  id: null
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case RESET_USER:
      return initialState
    case SET_USER:
      return { ...state, name: action.payload.name, email: action.payload.email, id: action.payload.id };
    default:
      return state;
  }
};

export default user;