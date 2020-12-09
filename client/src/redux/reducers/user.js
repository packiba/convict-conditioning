import { SET_USER } from "../actions/types";

const initialState = {
  userName: 'чемпион',
  email: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, userName: action.payload.name, email: action.payload.email };
    default:
      return state;
  }
};

export default user;