import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AsyncError = Record<string, any> | null;

export interface AsyncState {
  loading: boolean;
  error: AsyncError;
}

const initialState: AsyncState = { loading: false, error: null };

const asyncSlice = createSlice({
  name: 'async',
  initialState,
  reducers: {
    startLoading(state) { state.loading = true; state.error = null; },
    stopLoading(state) { state.loading = false; },
    setError(state, action: PayloadAction<Record<string, any>>) {
      state.loading = false;
      state.error = action.payload ?? {};
    },
    clearError(state) { state.error = null; },
    reset: () => initialState,
  },
});

export const { startLoading, stopLoading, setError, clearError, reset } = asyncSlice.actions;
export default asyncSlice.reducer;
