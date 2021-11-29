import reducer, {
  clearOrder,
  fetchOrder,
  fetchOrderInfo,
} from './orderSlice'

describe('order reducer', () => {
  const initialState = {
    request: false,
    error: false,
    order: {
      number: NaN,
      name: '',
    },
    info: null,
  }

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should return state with clear info', () => {
    expect(
      reducer({ ...initialState, info: 'info' }, clearOrder())
    ).toEqual(initialState)
  })

  describe('fetch order', () => {
    it('fetchOrder is pending', () => {
      const action = { type: fetchOrder.pending.type }
      const state = reducer(initialState, action)
      expect(state).toEqual({ ...initialState, request: true })
    })
    it('fetchOrder is fulfilled', () => {
      const action = { type: fetchOrder.fulfilled.type, payload: { order: { name: '123', number: 123 } } }
      const state = reducer(initialState, action)
      expect(state).toEqual({ ...initialState, order: { name: '123', number: 123 } })
    })
    it('fetchOrder is rejected', () => {
      const action = { type: fetchOrder.rejected.type, error: { message: 'some error' } }
      const state = reducer(initialState, action)
      expect(state).toEqual({ ...initialState, error: 'some error' })
    })
  })

  describe('fetch order info', () => {
    it('fetchOrderInfo is pending', () => {
      const action = { type: fetchOrderInfo.pending.type }
      const state = reducer(initialState, action)
      expect(state).toEqual({ ...initialState, request: true })
    })
    it('fetchOrderInfo is fulfilled', () => {
      const action = { type: fetchOrderInfo.fulfilled.type, payload: { orders: ['order info', 'other'] }}
      const state = reducer(initialState, action)
      expect(state).toEqual({ ...initialState, info: 'order info' })
    })
    it('fetchOrderInfo is rejected', () => {
      const action = { type: fetchOrderInfo.rejected.type, error: { message: 'some error' } }
      const state = reducer(initialState, action)
      expect(state).toEqual({ ...initialState, error: 'some error' })
    })
  })

})