import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { INGREDIENTS_URL, checkReponse } from '../../utils/api'

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredientsStatus',
  async () => fetch(INGREDIENTS_URL).then(checkReponse)
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
      state.ingredients = action.payload.data
    },
    [fetchIngredients.rejected]: (state, action) => {
      state.request = false
      state.ingredients = []
      state.error = action.error.message
    },
  }
})

export const selectIngredients = state => state.ingredients

export default ingredientsSlice.reducer
