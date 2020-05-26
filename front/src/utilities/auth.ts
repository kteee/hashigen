export const getToken = () => {
  return localStorage.getItem('token')
}

export const getUserId = () => {
  return localStorage.getItem('user_id')
}

export const setHeaders = () => {
  const header = getToken()
  return({
    headers: {
      Authorization: header
    }
  })
}