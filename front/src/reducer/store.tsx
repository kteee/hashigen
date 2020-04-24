import { createStore, combineReducers } from 'redux'
import { loginReducer } from './reducer'

export const store = createStore(
  combineReducers({
    loginReducer
  })
)