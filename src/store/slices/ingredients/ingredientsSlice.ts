import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../../types/store'
import { IBurgerIngredient } from '../../../types/types'
import { INGREDIENTS_URL, checkReponse } from '../../../utils/api'

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredientsStatus',
  async () => fetch(INGREDIENTS_URL).then(checkReponse)
)

interface IIngredients {
  request: boolean;
  error?: boolean | string;
  ingredients: IBurgerIngredient[]
}

const initialState: IIngredients = {
  request: false,
  error: false,
  ingredients: [],
}

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchIngredients.pending.type]: (state, action) => {
      state.request = true
      state.error = false
    },
    [fetchIngredients.fulfilled.type]: (state, action) => {
      state.request = false
      state.ingredients = action.payload.data
    },
    [fetchIngredients.rejected.type]: (state, action) => {
      state.request = false
      state.ingredients = []
      state.error = action.error.message
    },
  }
})

export const selectIngredients = (state: RootState) => state.ingredients

export default ingredientsSlice.reducer
