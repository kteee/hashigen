import { Reducer } from 'redux'
import { actionType } from './actionTypes'
import { LoginReducerType, LoginReducer } from '../utilities/types'

const initialState: LoginReducer = {
  login: false,
  userName: ''
}

export const loginReducer = (state=initialState, action: LoginReducerType): LoginReducer => {
  switch (action.type) {
    case actionType.LOGIN:
      return ({
        ...state,
        login: true
      })
    default:
      return state
  }
}