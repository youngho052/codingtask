import { USER_TOKEN } from '../types'

export const userToken = (data) => {
  return {
    type: USER_TOKEN,
    payload: data,
  }
}
