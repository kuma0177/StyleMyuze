import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../../utils/types/Auth';

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    populateUser(state, action: PayloadAction<Partial<User>>) {
      const payload = {
        ...action.payload,
        age: (() => {
          if (!action.payload.dateOfBirth) return state.user?.age;
          const dob = new Date(action.payload.dateOfBirth);
          const today = new Date();
          let age = today.getFullYear() - dob.getFullYear();
          const monthDiff = today.getMonth() - dob.getMonth();
          const dayDiff = today.getDate() - dob.getDate();
          if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age--;
          return age;
        })(),
      };
      state.user = { ...state.user, ...payload } as User;
    },
    resetUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    loginSuccess(state, action: PayloadAction<{ user: User | null }>) {
      state.user = action.payload.user;
      state.loading = false;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, populateUser, resetUser } = authSlice.actions;
export default authSlice.reducer;
