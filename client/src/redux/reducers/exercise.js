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
  levReps: [],
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
        levReps: [new Array(action.payload.data.level1.length).fill(false),
          new Array(action.payload.data.level2.length).fill(false),
          new Array(action.payload.data.level3.length).fill(false)
        ],
        isLoaded: true
      };
    case SET_LEVEL_ACTIVE:
      const newLevReps = [new Array(state.level1.length).fill(false),
        new Array(state.level2.length).fill(false),
        new Array(state.level3.length).fill(false)
      ]
      newLevReps[action.payload][0] = true
      console.log('levReps', newLevReps)
      return {...state, activeLevel: action.payload, levReps: newLevReps}
    default:
      return state;
  }
};

export default exercise;