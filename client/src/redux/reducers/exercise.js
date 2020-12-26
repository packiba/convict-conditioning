import {SET_EXERCISE, SET_EXERCISE_DATA} from '../actions/types'

const initialState = {
  isLoaded: false,
  catId: null,
  exerciseId : null,
  category: '',
  name: '',
  level1: [],
  level2: [],
  level3: [],
  description: '',
};

const exercise = (state = initialState, action) => {
  switch (action.type) {
    case SET_EXERCISE:
      console.log('activeExercise', action.payload)
      return { ...state, catId:action.payload.idCat, exerciseId: action.payload.id};
    case SET_EXERCISE_DATA:
      console.log('activeExercise', action.payload)
      return { ...state,
        category: action.payload.data.category.name,
        name: action.payload.data.exercise.name,
        level1: action.payload.data.level1,
        level2: action.payload.data.level2,
        level3: action.payload.data.level3,
        description: action.payload.data.description,
        isLoaded: true
      };
    default:
      return state;
  }
};

export default exercise;