import reducer, { fetchIngredients } from './ingredientsSlice'

describe('ingredients reducer', () => {
  const initialState = { request: false, error: false, ingredients: [] }

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  describe('fetch ingredients', () => {
    it('fetch Ingredients is pending', () => {
      const action = { type: fetchIngredients.pending.type }
      const state = reducer(initialState, action)
      expect(state).toEqual({ ...initialState, request: true })
    })
    it('fetch Ingredients is fulfilled', () => {
      const action = { type: fetchIngredients.fulfilled.type, payload: { data: [1, 2, 3] } }
      const state = reducer(initialState, action)
      expect(state).toEqual({ ...initialState, ingredients: [1, 2, 3] })
    })
    it('fetch Ingredients is rejected', () => {
      const action = { type: fetchIngredients.rejected.type, error: { message: 'some error' } }
      const state = reducer(initialState, action)
      expect(state).toEqual({ ...initialState, error: 'some error' })
    })
  })
})