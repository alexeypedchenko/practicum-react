import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../../types/store'
import { createAction } from '@reduxjs/toolkit';
import { IOrder } from '../../../types/types';

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}

interface ILiveOrders {
  status: WebsocketStatus;
  connectionError: string;
  data: {
    orders: IOrder[];
    success: boolean;
    total: number;
    totalToday: number;
  } | null;
}

const initialState: ILiveOrders = {
  status: WebsocketStatus.OFFLINE,
  connectionError: '',
  data: null
}

const liveOrders = createSlice({
  name: 'liveOrders',
  initialState,
  reducers: {
    wsConnecting: (state) => {
      state.status = WebsocketStatus.CONNECTING
    },
    wsOpen: (state) => {
      state.status = WebsocketStatus.ONLINE
      state.connectionError = ''
    },
    wsClose: (state) => {
      state.status = WebsocketStatus.OFFLINE
    },
    wsError: (state, action) => {
      state.connectionError = action.payload
    },
    wsMessage: (state, action) => {
      state.data = action.payload
    },
  }
})

export const wsConnect = createAction<string, 'LIVE_ORDERS_CONNECT'>('LIVE_ORDERS_CONNECT');
export const wsDisconnect = createAction('LIVE_ORDERS_DISCONNECT');
export const {
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage,
} = liveOrders.actions

export const selectLiveOrders = (state: RootState) => state.liveOrders

export default liveOrders.reducer
