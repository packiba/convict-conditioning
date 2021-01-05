import {RESET_USER, SET_USER} from './types'


export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
})

export const resetUser = {
  type: RESET_USER,
}