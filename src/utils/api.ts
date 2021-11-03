import { ITokens } from "../types/types"

export const API_URL: string = 'https://norma.nomoreparties.space/api'
export const INGREDIENTS_URL: string = `${API_URL}/ingredients`
export const ORDER_URL: string = `${API_URL}/orders`
// AUTH
export const AUTH_LOGIN_URL: string = `${API_URL}/auth/login`
export const AUTH_REGISTER_URL: string = `${API_URL}/auth/register`
export const AUTH_LOGOUT_URL: string = `${API_URL}/auth/logout`
export const AUTH_TOKEN_URL: string = `${API_URL}/auth/token`
// PASSWORD
export const PASSWORD_FORGOT_URL: string = `${API_URL}/password-reset`
export const PASSWORD_RESET_URL: string = `${API_URL}/password-reset/reset`
// USER
export const GET_USER_URL: string = `${API_URL}/auth/user`
export const PATCH_USER_URL: string = `${API_URL}/auth/user`

export const checkReponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}
export const refreshToken = <T>() => fetch(AUTH_TOKEN_URL, {
  method: 'POST',
  headers: {'Content-Type': 'application/json',},
  body: JSON.stringify({token: localStorage.getItem('refreshToken')}),
}).then((res) => checkReponse<T>(res))

export const fetchDataWithTokens = (url: string, data: {}) => fetch(url, {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {'Content-Type': 'application/json'}
}).then((res) => {
  if (!res.ok) return res.json().then((err) => Promise.reject(err))
  return res.json()
}).then((data) => {
  const { accessToken, refreshToken }: ITokens = data
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
  return data
})

export const fetchPost = (url: string, data: {}) => fetch(url, {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {'Content-Type': 'application/json'}
}).then(checkReponse)

export const fetchWithRefresh = async (url: string, options: any) => {
  try {
    const res = await fetch(url, options)
    return await checkReponse(res)
  } catch (err) {
    if ((err as Error).message === 'jwt expired') {
      const refreshData: ITokens = await refreshToken<ITokens>()
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
