import { configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlice'
import burgerConstructorSlice from './slices/burgerConstructorSlice';
import detailIngredientSlice from './slices/detailIngredientSlice';
import orderSlice from './slices/orderSlice';

export default configureStore({
  reducer: {
    ingredients: ingredientsSlice,
    burgerConstructor: burgerConstructorSlice,
    detailIngredient: detailIngredientSlice,
    order: orderSlice,
  },
})
