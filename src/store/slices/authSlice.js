import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

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
  async (user) => fetchDataWithTokens(AUTH_REGISTER_URL, user)
)
export const authUser = createAsyncThunk(
  'auth/authUser',
  async (user) => fetchDataWithTokens(AUTH_LOGIN_URL, user)
)
export const canResetPassword = createAsyncThunk(
  'auth/canResetPassword',
  async (data) => fetchPost(PASSWORD_FORGOT_URL, data)
)
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data) => fetchPost(PASSWORD_RESET_URL, data)
)
export const getUser = createAsyncThunk(
  'auth/getUser',
  async (token) => fetchWithRefresh(GET_USER_URL, {
    headers: {'authorization': token}
  })
)
export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (data) => fetchWithRefresh(PATCH_USER_URL, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'authorization': localStorage.getItem('accessToken'),
      'Content-Type': 'application/json'
    }
  })
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

const initialUser = {
  email: '',
  name: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    request: false,
    error: false,
    user: initialUser,
    passwordReset: false,
  },
  extraReducers: {
    // registerUser
    [registerUser.pending]: (state) => {
      state.request = true
      state.error = false
    },
    [registerUser.fulfilled]: (state, action) => {
      state.request = false
      state.user = action.payload.user
    },
    [registerUser.rejected]: (state, action) => {
      state.request = false
      state.user = initialUser
      state.error = action.error.message
    },
    // authUser
    [authUser.pending]: (state) => {
      state.request = true
      state.error = false
    },
    [authUser.fulfilled]: (state, action) => {
      state.request = false
      state.passwordReset = false
      state.user = action.payload.user
    },
    [authUser.rejected]: (state, action) => {
      state.request = false
      state.user = initialUser
      state.error = action.error.message
    },
    // canResetPassword
    [canResetPassword.pending]: (state) => {
      state.request = true
      state.error = false
    },
    [canResetPassword.fulfilled]: (state, action) => {
      state.request = false
      state.passwordReset = action.payload.success
    },
    [canResetPassword.rejected]: (state, action) => {
      state.request = false
      state.error = action.error.message
      state.passwordReset = false
    },
    // resetPassword
    [resetPassword.pending]: (state) => {
      state.request = true
      state.error = false
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.request = false
      state.passwordReset = false
    },
    [resetPassword.rejected]: (state, action) => {
      state.request = false
      state.error = action.error.message
    },
    // getUser
    [getUser.pending]: (state) => {
      state.request = true
      state.error = false
    },
    [getUser.fulfilled]: (state, action) => {
      state.request = false
      state.passwordReset = false
      state.user = action.payload.user
    },
    [getUser.rejected]: (state) => {
      state.request = false
      state.user = initialUser
    },
    // updateUser
    [updateUser.pending]: (state) => {
      state.request = true
      state.error = false
    },
    [updateUser.fulfilled]: (state, action) => {
      state.request = false
      state.user = action.payload.user
    },
    [updateUser.rejected]: (state, action) => {
      state.request = false
      state.error = action.error.message
      state.user = initialUser
    },
    // logout
    [logout.pending]: (state) => {
      state.request = true
      state.error = false
    },
    [logout.fulfilled]: (state) => {
      state.request = false
      state.user = initialUser
    },
    [logout.rejected]: (state, action) => {
      state.request = false
      state.error = action.error.message
    },
  }
})

export const selectAuth = state => state.auth

export default authSlice.reducer
