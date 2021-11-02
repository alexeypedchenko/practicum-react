import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchWithRefresh, ORDER_URL } from '../../utils/api'

export const fetchOrder = createAsyncThunk(
  'order/fetchOrderStatus',
  async (data) => fetchWithRefresh(ORDER_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'authorization': localStorage.getItem('accessToken'),
      'Content-Type': 'application/json'
    }
  })
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
