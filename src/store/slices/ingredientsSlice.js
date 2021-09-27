import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL } from '../../utils/utils'

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredientsStatus',
  async () => fetch(API_URL)
  .then((response) => {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(response.status)
  })
  .then((data) => data.data)
  .catch((err) => err)
)

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    request: false,
    error: false,
    ingredients: [],
  },
  reducers: {
  },
  extraReducers: {
    [fetchIngredients.pending]: (state, action) => {
      state.request = true
      state.error = false
    },
    [fetchIngredients.fulfilled]: (state, action) => {
      state.request = false
      state.ingredients = action.payload
    },
    [fetchIngredients.rejected]: (state, action) => {
      state.request = false
      state.ingredients = []
      state.error = action.payload
    },
  }
})

export const selectIngredients = state => state.ingredients

export default ingredientsSlice.reducer
