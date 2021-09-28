import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ORDER_URL } from '../../utils/utils'

export const fetchOrder = createAsyncThunk(
  'order/fetchOrderStatus',
  async (order) => fetch(ORDER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ingredients: order })
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(response.status)
    })
    .then((data) => data)
)

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    request: false,
    error: false,
    order: {},
  },
  extraReducers: {
    [fetchOrder.pending]: (state, action) => {
      state.request = true
      state.error = false
    },
    [fetchOrder.fulfilled]: (state, action) => {
      state.request = false
      state.order = action.payload
    },
    [fetchOrder.rejected]: (state, action) => {
      state.request = false
      state.order = {}
      state.error = action.error.message
    },
  }
})

export const selectOrder = state => state.order

export default orderSlice.reducer
