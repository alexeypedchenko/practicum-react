import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../types/store'
import { IBurgerIngredient } from '../../types/types'

interface IBurgerConstructor {
  ingredients: IBurgerIngredient[]
  bun: IBurgerIngredient | null
}

const initialState: IBurgerConstructor = {
  ingredients: [],
  bun: null,
}

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBun: (state, action) => {
      state.bun = action.payload
    },
    addIngridient: (state, action) => {
      state.ingredients.push(action.payload)
    },
    removeIngredient: (state, action) => {
      state.ingredients = [
        ...state.ingredients.filter((ingridient) => ingridient.id !== action.payload)
      ]
    },
    removeAllIngredients: (state) => {
      state.ingredients = []
      state.bun = null
    },
    changeItemsPosition: (state, action) => {
      const ingredients = [...state.ingredients]
      ingredients.splice(action.payload.dragIndex, 0, ingredients.splice(action.payload.hoverIndex, 1)[0])
      state.ingredients = ingredients
    }
  },
})

export const {
  addIngridient,
  removeIngredient,
  addBun,
  removeAllIngredients,
  changeItemsPosition,
} = burgerConstructorSlice.actions

export const selectBurgerConstructor = (state: RootState) => state.burgerConstructor

export default burgerConstructorSlice.reducer
