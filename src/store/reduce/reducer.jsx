import { USER_TOKEN, DELETE_TOKEN } from '../types'

const INITIAL_STATE = null

function tokenReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_TOKEN:
      return action.payload
    case DELETE_TOKEN:
      return action.payload
    default:
      return state
  }
}

export default tokenReducer
