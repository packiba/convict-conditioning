import {SET_EXERCISE_ACTIVE} from '../actions/types'

const initialState = {
  catId: null,
  exerciseId : null
};

const exercise = (state = initialState, action) => {
  switch (action.type) {
    case SET_EXERCISE_ACTIVE:
      console.log('activeExercise', action.payload)
      return { ...state, catId:action.payload.idCat, exerciseId: action.payload.id};
    default:
      return state;
  }
};

export default exercise;