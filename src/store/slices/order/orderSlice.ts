import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { checkReponse, fetchWithRefresh, ORDER_URL } from '../../../utils/api'
import { RootState } from '../../../types/store'
import { IOrder } from '../../../types/types'

export const fetchOrder = createAsyncThunk(
  'order/fetchOrderStatus',
  async (data: {ingredients: string[]}) => fetchWithRefresh(ORDER_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'authorization': localStorage.getItem('accessToken'),
      'Content-Type': 'application/json'
    }
  }) as any
)

export const fetchOrderInfo = createAsyncThunk(
  'order/fetchOrderInfo',
  async (id: string) => fetch(`${ORDER_URL}/${id}`).then(checkReponse)
)

interface IOrderSlice {
  request: boolean;
  error: boolean | string;
  order: {
    number: number;
    name: string;
  },
  info: IOrder | null,
}

const initialState: IOrderSlice = {
  request: false,
  error: false,
  order: {
    number: NaN,
    name: '',
  },
  info: null,
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.info = null
    }
  },
  extraReducers: {
    [fetchOrder.pending.type]: (state) => {
      state.request = true
      state.error = false
    },
    [fetchOrder.fulfilled.type]: (state, action) => {
      state.request = false
      state.order.name = action.payload.order.name
      state.order.number = action.payload.order.number
    },
    [fetchOrder.rejected.type]: (state, action) => {
      state.request = false
      state.order = {...initialState.order}
      state.error = action.error.message
    },

    [fetchOrderInfo.pending.type]: (state) => {
      state.request = true
      state.error = false
    },
    [fetchOrderInfo.fulfilled.type]: (state, action) => {
      state.request = false
      state.info = action.payload.orders[0]
    },
    [fetchOrderInfo.rejected.type]: (state, action) => {
      state.request = false
      state.info = null
      state.error = action.error.message
    },
  }
})

export const { clearOrder } = orderSlice.actions

export const selectOrder = (state: RootState) => state.order

export default orderSlice.reducer
