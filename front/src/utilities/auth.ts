export const getAuthHeader = () => {
  return localStorage.getItem('token')
}

export const getUserId = () => {
  return localStorage.getItem('user_id')
}