import {SET_EXERCISE, SET_EXERCISE_DATA, SET_LEVEL_ACTIVE} from '../actions/types'

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
  animUri: '',
  activeLevel: 0,
};

const exercise = (state = initialState, action) => {
  switch (action.type) {
    case SET_EXERCISE:
      return { ...state, catId:action.payload.idCat, exerciseId: action.payload.id, isLoaded: false};
    case SET_EXERCISE_DATA:
      return { ...state,
        category: action.payload.data.category.name,
        name: action.payload.data.exercise.name,
        level1: action.payload.data.level1,
        level2: action.payload.data.level2,
        level3: action.payload.data.level3,
        description: action.payload.data.description,
        animUri: action.payload.data.anim,
        activeLevel: 0,
        isLoaded: true
      };
    case SET_LEVEL_ACTIVE:
      return {...state, activeLevel: action.payload}
    default:
      return state;
  }
};

export default exercise;