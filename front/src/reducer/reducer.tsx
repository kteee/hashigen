import { LoginReducerState } from '../utilities/types'
import { LOGIN, ActionTypes } from '../reducer/action'

const initialState: LoginReducerState = {
  loggedIn: false,
  accountId: undefined
}

export const loginReducer = (
  state=initialState,
  action: ActionTypes
): LoginReducerState => {
  switch (action.type) {
    case LOGIN:
      return ({
        ...state,
        loggedIn: true,
        accountId: action.accountId
      })
    default:
      return state
  }
}