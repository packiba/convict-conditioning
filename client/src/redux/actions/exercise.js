import {SET_EXERCISE_ACTIVE} from './types'


export const setExerciseActive = (id, name) => ({
  type: SET_EXERCISE_ACTIVE,
  payload: {id, name}
});
