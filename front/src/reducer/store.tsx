import { createStore, combineReducers, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
import { loginReducer, messageReducer } from './reducer'

const rootReducer = combineReducers({
  login: loginReducer,
  message: messageReducer
})

export const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>