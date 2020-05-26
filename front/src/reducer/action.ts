export const LOGIN = 'LOGIN'
export const SHOW_MESSAGE = 'SHOW_MESSAGE'
export const HIDE_MESSAGE = 'HIDE_MESSAGE'

export interface LoginActionType {
  type: typeof LOGIN
  accountId: number|undefined
}

export interface ShowMessageActionType {
  type: typeof SHOW_MESSAGE
  message: string
}

export interface HideMessageActionType {
  type: typeof HIDE_MESSAGE
}

export const loginAction = (accountId: number): LoginActionType => ({
  type: LOGIN,
  accountId: accountId
})

export const showMessage = (message: string): ShowMessageActionType => ({
  type: SHOW_MESSAGE,
  message: message
})

export const hideMessage = (): HideMessageActionType => ({
  type: HIDE_MESSAGE
})