import reducer, {
  WebsocketStatus,
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage,
} from './liveOrdersSlice'

describe('live orders reducer', () => {
  const initialState = {
    status: WebsocketStatus.OFFLINE,
    connectionError: '',
    data: null
  }

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should return state with status CONNECTING', () => {
    expect(
      reducer(initialState, wsConnecting())
    ).toEqual({
      ...initialState, status: WebsocketStatus.CONNECTING,
    })
  })

  it('should return state with status ONLINE', () => {
    expect(
      reducer(initialState, wsOpen())
    ).toEqual({
      ...initialState, status: WebsocketStatus.ONLINE,
    })
  })

  it('should return state with status OFFLINE', () => {
    expect(
      reducer(initialState, wsClose())
    ).toEqual({
      ...initialState, status: WebsocketStatus.OFFLINE,
    })
  })

  it('should return state with error', () => {
    expect(
      reducer(initialState, wsError('error'))
    ).toEqual({
      ...initialState, connectionError: 'error',
    })
  })

  it('should return state with messages', () => {
    expect(
      reducer(initialState, wsMessage([1, 2, 3]))
    ).toEqual({
      ...initialState, data: [1, 2, 3],
    })
  })

})
