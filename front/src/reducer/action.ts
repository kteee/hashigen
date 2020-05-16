export const LOGIN = 'LOGIN'

export interface ActionTypes {
  type: typeof LOGIN,
  accountId: number|undefined
}

export const loginAction = (accountId: number): ActionTypes => ({
  type: LOGIN,
  accountId: accountId
})