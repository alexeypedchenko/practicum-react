export const API_URL = 'https://norma.nomoreparties.space/api'
export const INGREDIENTS_URL = `${API_URL}/ingredients`
export const ORDER_URL = `${API_URL}/orders`
// AUTH
export const AUTH_LOGIN_URL = `${API_URL}/auth/login`
export const AUTH_REGISTER_URL = `${API_URL}/auth/register`
export const AUTH_LOGOUT_URL = `${API_URL}/auth/logout`
export const AUTH_TOKEN_URL = `${API_URL}/auth/token`
// PASSWORD
export const PASSWORD_FORGOT_URL = `${API_URL}/password-reset`
export const PASSWORD_RESET_URL = `${API_URL}/password-reset/reset`
// USER
export const GET_USER_URL = `${API_URL}/auth/user`
export const PATCH_USER_URL = `${API_URL}/auth/user`

export const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}
export const refreshToken = () => fetch(AUTH_TOKEN_URL, {
  method: 'POST',
  headers: {'Content-Type': 'application/json',},
  body: JSON.stringify({token: localStorage.getItem('refreshToken')}),
}).then(checkReponse)
// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjE4YzAyN2RlYjU0MDAxYmE1ZmRkMyIsImlhdCI6MTYzMzk3OTIzMCwiZXhwIjoxNjMzOTgwNDMwfQ.cUfY3nt73VPBawUnXCTGw9XxoOVEULhnc1_Gw16QtOU
export const fetchDataWithTokens = (url, data) => fetch(url, {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {'Content-Type': 'application/json'}
}).then((res) => {
  if (!res.ok) return res.json().then((err) => Promise.reject(err))
  return res.json()
}).then((data) => {
  const { accessToken, refreshToken } = data
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
  return data
})

export const fetchPost = (url, data) => fetch(url, {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {'Content-Type': 'application/json'}
}).then(checkReponse)

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options)
    return await checkReponse(res)
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken()
      localStorage.setItem('refreshToken', refreshData.refreshToken)
      localStorage.setItem('accessToken', refreshData.accessToken)
      options.headers.authorization = refreshData.accessToken
      const res = await fetch(url, options)
      return await checkReponse(res)
    } else {
      return Promise.reject(err)
    }
  }
}
