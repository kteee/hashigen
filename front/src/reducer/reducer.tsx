import { LoginReducerState } from '../utilities/types'
import { LOGIN, ActionTypes } from '../reducer/action'

const initialState: LoginReducerState = {
  loggedIn: false
}

export const loginReducer = (
  state=initialState,
  action: ActionTypes
): LoginReducerState => {
  switch (action.type) {
    case LOGIN:
      console.log('login action dispatched')
      console.log(state)
      return ({
        ...state,
        loggedIn: true
      })
    default:
      console.log(state)
      return state
  }
}