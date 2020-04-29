export const LOGIN = 'LOGIN'

export interface ActionTypes {
  type: typeof LOGIN
}

export const loginAction = (): ActionTypes => ({
  type: LOGIN
})