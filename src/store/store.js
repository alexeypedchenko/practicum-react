import { configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlice'
import burgerConstructorSlice from './slices/burgerConstructorSlice';
import orderSlice from './slices/orderSlice';
import authSlice from './slices/authSlice'

export default configureStore({
  reducer: {
    ingredients: ingredientsSlice,
    burgerConstructor: burgerConstructorSlice,
    order: orderSlice,
    auth: authSlice,
  },
})
