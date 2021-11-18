import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../types/store'
import { IStringObject } from '../../types/types'

import {
  AUTH_LOGIN_URL,
  AUTH_REGISTER_URL,
  PASSWORD_FORGOT_URL,
  PASSWORD_RESET_URL,
  GET_USER_URL,
  PATCH_USER_URL,
  AUTH_LOGOUT_URL,
  fetchDataWithTokens,
  fetchPost,
  fetchWithRefresh,
} from '../../utils/api'

export const registerUser = createAsyncThunk(
 'auth/registerUser',
  async (user: IStringObject) => fetchDataWithTokens(AUTH_REGISTER_URL, user)
)
export const authUser = createAsyncThunk(
  'auth/authUser',
  async (user: IStringObject) => fetchDataWithTokens(AUTH_LOGIN_URL, user)
)
export const canResetPassword = createAsyncThunk(
  'auth/canResetPassword',
  async (data: IStringObject) => fetchPost(PASSWORD_FORGOT_URL, data) as any
)
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data: IStringObject) => fetchPost(PASSWORD_RESET_URL, data) as any
)
export const getUser = createAsyncThunk(
  'auth/getUser',
  async (token: string) => fetchWithRefresh(GET_USER_URL, {
    headers: {'authorization': token}
  })
) as any
export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (data: IStringObject) => fetchWithRefresh(PATCH_USER_URL, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'authorization': localStorage.getItem('accessToken'),
      'Content-Type': 'application/json'
    }
  }) as any
)
export const logout = createAsyncThunk(
  'auth/logout',
  async () => fetch(AUTH_LOGOUT_URL, {
    method: 'POST',
    body: JSON.stringify({token: localStorage.getItem('refreshToken')}),
    headers: {'Content-Type': 'application/json'}
  }).then((res) => {
    if (!res.ok) return res.json().then((err) => Promise.reject(err))
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    return res.json()
  })
)

interface IAuth {
  request: boolean,
  error: string,
  user: {
    email: string,
    name: string,
  },
  passwordReset: boolean,
}

const initialState: IAuth = {
  request: false,
  error: '',
  user: {
    email: '',
    name: '',
  },
  passwordReset: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    // registerUser
    [registerUser.pending.type]: (state) => {
      state.request = true
      state.error = ''
    },
    [registerUser.fulfilled.type]: (state, action) => {
      state.request = false
      state.user = action.payload.user
    },
    [registerUser.rejected.type]: (state, action) => {
      state.request = false
      state.user = {...initialState.user}
      state.error = action.error.message
    },
    // authUser
    [authUser.pending.type]: (state) => {
      state.request = true
      state.error = ''
    },
    [authUser.fulfilled.type]: (state, action) => {
      state.request = false
      state.passwordReset = false
      state.user = action.payload.user
    },
    [authUser.rejected.type]: (state, action) => {
      state.request = false
      state.user = {...initialState.user}
      state.error = action.error.message
    },
    // canResetPassword
    [canResetPassword.pending.type]: (state) => {
      state.request = true
      state.error = ''
    },
    [canResetPassword.fulfilled.type]: (state, action) => {
      state.request = false
      state.passwordReset = action.payload.success
    },
    [canResetPassword.rejected.type]: (state, action) => {
      state.request = false
      state.error = action.error.message
      state.passwordReset = false
    },
    // resetPassword
    [resetPassword.pending.type]: (state) => {
      state.request = true
      state.error = ''
    },
    [resetPassword.fulfilled.type]: (state, action) => {
      state.request = false
      state.passwordReset = false
    },
    [resetPassword.rejected.type]: (state, action) => {
      state.request = false
      state.error = action.error.message
    },
    // getUser
    [getUser.pending.type]: (state) => {
      state.request = true
      state.error = ''
    },
    [getUser.fulfilled.type]: (state, action) => {
      state.request = false
      state.passwordReset = false
      state.user = action.payload.user
    },
    [getUser.rejected.type]: (state) => {
      state.request = false
      state.user = {...initialState.user}
    },
    // updateUser
    [updateUser.pending.type]: (state) => {
      state.request = true
      state.error = ''
    },
    [updateUser.fulfilled.type]: (state, action) => {
      state.request = false
      state.user = action.payload.user
    },
    [updateUser.rejected.type]: (state, action) => {
      state.request = false
      state.error = action.error.message
      state.user = {...initialState.user}
    },
    // logout
    [logout.pending.type]: (state) => {
      state.request = true
      state.error = ''
    },
    [logout.fulfilled.type]: (state) => {
      state.request = false
      state.user = {...initialState.user}
    },
    [logout.rejected.type]: (state, action) => {
      state.request = false
      state.error = action.error.message
    },
  }
})

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
