import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { socketMiddleware } from './middleware/socket-middleware';
// slices
import ingredientsSlice from './slices/ingredientsSlice'
import burgerConstructorSlice from './slices/burgerConstructorSlice';
import orderSlice from './slices/orderSlice';
import authSlice from './slices/authSlice'
import liveOrdersSlice, {
  wsConnect,
  wsDisconnect,
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage,
} from './slices/liveOrdersSlice'
const wsActions = {
  wsConnect,
  wsDisconnect,
  wsConnecting,
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage,
};

const liveOrdersMiddleware = socketMiddleware(wsActions);

const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  burgerConstructor: burgerConstructorSlice,
  order: orderSlice,
  auth: authSlice,
  liveOrders: liveOrdersSlice
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(liveOrdersMiddleware)
  }
})

export default store
