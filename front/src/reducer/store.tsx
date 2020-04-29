import { createStore, combineReducers, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
import { loginReducer } from './reducer'

const rootReducer = combineReducers({
  loginReducer
})

export const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>

// export const store = createStore(
//   rootReducer,
//   applyMiddleware(thunk)
// )