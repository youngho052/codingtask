import { combineReducers } from 'redux'
import tokenReducer from './reduce/reducer'

export const rootReducer = combineReducers({ tokenReducer })
