import { USER_TOKEN, DELETE_TOKEN } from '../types'

export const userToken = (data) => {
  return {
    type: USER_TOKEN,
    payload: data,
  }
}

export const deleteToken = (data) => {
  return {
    type: DELETE_TOKEN,
    payload: data,
  }
}
