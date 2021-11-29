import reducer, {
  registerUser,
  authUser,
  canResetPassword,
  resetPassword,
  getUser,
  updateUser,
  logout,
} from './authSlice'

describe('auth reducer', () => {
  const initialState = {
    request: false,
    error: '',
    user: {
      email: '',
      name: '',
    },
    passwordReset: false,
  }

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  describe('register user', () => {
    it('registerUser is pending', () => {
      const action = { type: registerUser.pending.type }
      const state = reducer(initialState, action)
      expect(state).toEqual({ ...initialState, request: true })
    })
    it('registerUser is fulfilled', () => {
      const action = { type: registerUser.fulfilled.type, payload: { user: 'user' } }
      const state = reducer(initialState, action)
      expect(state).toEqual({ ...initialState, user: 'user' })
    })
    it('registerUser is rejected', () => {
      const action = { type: registerUser.rejected.type, error: { message: 'some error' } }
      const state = reducer(initialState, action)
      expect(state).toEqual({ ...initialState, error: 'some error' })
    })
  })

  describe('auth user', () => {
    it('authUser is pending', () => {
      const action = { type: authUser.pending.type }
      const state = reducer(initialState, action)
      expect(state).toEqual({ ...initialState, request: true })
    })
    it('authUser is fulfilled', () => {
      const action = { type: authUser.fulfilled.type, payload: { user: 'user' } }
      const state = reducer(initialState, action)
      expect(state).toEqual({ ...initialState, user: 'user' })
    })
    it('authUser is rejected', () => {
      const action = { type: authUser.rejected.type, error: { message: 'some error' } }
      const state = reducer(initialState, action)
      expect(state).toEqual({ ...initialState, error: 'some error' })
    })
  })

  describe('can reset password', () => {
    it('canResetPassword is pending', () => {
      const action = { type: canResetPassword.pending.type }
      const state = reducer(initialState, action)
      expect(state).toEqual({ ...initialState, request: true })
    })
    it('canResetPassword is fulfilled', () => {
      const action = { type: canResetPassword.fulfilled.type, payload: { success: true } }
      const state = reducer(initialState, action)
      expect(state).toEqual({ ...initialState, passwordReset: true })
    })
    it('canResetPassword is rejected', () => {
      const action = { type: canResetPassword.rejected.type, error: { message: 'some error' } }
      const state = reducer(initialState, action)
      expect(state).toEqual({ ...initialState, error: 'some error' })
    })
  })

  describe('reset password', () => {
    it('resetPassword is pending', () => {
      const action = { type: resetPassword.pending.type }
      const state = reducer(initialState, action)
      expect(state).toEqual({ ...initialState, request: true })
    })
    it('resetPassword is fulfilled', () => {
      const action = { type: resetPassword.fulfilled.type }
      const state = reducer(initialState, action)
      expect(state).toEqual(initialState)
    })
    it('resetPassword is rejected', () => {
      const action = { type: resetPassword.rejected.type, error: { message: 'some error' } }
      const state = reducer(initialState, action)
      expect(state).toEqual({ ...initialState, error: 'some error' })
    })
  })

  describe('get user', () => {
    it('getUser is pending', () => {
      const action = { type: getUser.pending.type }
      const state = reducer(initialState, action)
      expect(state).toEqual({ ...initialState, request: true })
    })
    it('getUser is fulfilled', () => {
      const action = { type: getUser.fulfilled.type, payload: { user: 'user' } }
      const state = reducer(initialState, action)
      expect(state).toEqual({ ...initialState, user: 'user' })
    })
    it('getUser is rejected', () => {
      const action = { type: getUser.rejected.type }
      const state = reducer(initialState, action)
      expect(state).toEqual(initialState)
    })
  })

  describe('update user', () => {
    it('updateUser is pending', () => {
      const action = { type: updateUser.pending.type }
      const state = reducer(initialState, action)
      expect(state).toEqual({ ...initialState, request: true })
    })
    it('updateUser is fulfilled', () => {
      const action = { type: updateUser.fulfilled.type, payload: { user: 'user' } }
      const state = reducer(initialState, action)
      expect(state).toEqual({ ...initialState, user: 'user' })
    })
    it('updateUser is rejected', () => {
      const action = { type: updateUser.rejected.type, error: { message: 'some error' } }
      const state = reducer(initialState, action)
      expect(state).toEqual({ ...initialState, error: 'some error' })
    })
  })

  describe('logout', () => {
    it('logout is pending', () => {
      const action = { type: logout.pending.type }
      const state = reducer(initialState, action)
      expect(state).toEqual({ ...initialState, request: true })
    })
    it('logout is fulfilled', () => {
      const action = { type: logout.fulfilled.type }
      const state = reducer(initialState, action)
      expect(state).toEqual(initialState)
    })
    it('logout is rejected', () => {
      const action = { type: logout.rejected.type, error: { message: 'some error' } }
      const state = reducer(initialState, action)
      expect(state).toEqual({ ...initialState, error: 'some error' })
    })
  })
})
