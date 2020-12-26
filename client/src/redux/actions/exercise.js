import {SET_EXERCISE, SET_EXERCISE_DATA} from './types'


export const setExercise = (id, idCat) => ({
  type: SET_EXERCISE,
  payload: {id, idCat}
});

export const setExerciseData = (data) => ({
  type: SET_EXERCISE_DATA,
  payload: {data}
});
