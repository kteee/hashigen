import { LoginReducerState, MessageReducerState } from '../utilities/types'
import { LOGIN, SHOW_MESSAGE, HIDE_MESSAGE,
  LoginActionType, ShowMessageActionType, HideMessageActionType } from '../reducer/action'

const initialLoginState: LoginReducerState = {
  loggedIn: false,
  accountId: undefined
}

const initialMesageState: MessageReducerState = {
  open: false,
  message: ''
}

export const loginReducer = (
  state = initialLoginState,
  action: LoginActionType
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

export const messageReducer = (
  state = initialMesageState,
  action: ShowMessageActionType | HideMessageActionType
): MessageReducerState => {
  switch (action.type) {
    case SHOW_MESSAGE:
      return ({
        ...state,
        open: true,
        message: action.message
      })
    case HIDE_MESSAGE:
      return ({
        ...state,
        open: false,
        message: ''
      })
    default:
      return state
  }
}