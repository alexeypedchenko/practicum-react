import { AsyncThunkAction, unwrapResult } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook
} from 'react-redux';
import { AppDispatch, RootState } from '../types/store';

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useUnwrapAsyncThunk = () => {
  const dispatch = useDispatch();
  return useCallback(
    <R extends any>(asyncThunk: AsyncThunkAction<R, any, any>): Promise<R> =>
      dispatch(asyncThunk).then(unwrapResult),
    [dispatch]
  );
};
