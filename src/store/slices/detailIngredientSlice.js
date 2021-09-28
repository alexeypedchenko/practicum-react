import { createSlice } from '@reduxjs/toolkit'

const detailIngredientSlice = createSlice({
  name: 'detailIngredient',
  initialState: {
    detailIngredient: null,
  },
  reducers: {
    setDetailIngredient: (state, action) => {
      state.detailIngredient = action.payload
    },
    removeDetailIngredient: (state) => {
      state.detailIngredient = null
    },
  },
})

export const {
  setDetailIngredient,
  removeDetailIngredient
} = detailIngredientSlice.actions

export const selectDetailIngredient = state => state.detailIngredient

export default detailIngredientSlice.reducer


