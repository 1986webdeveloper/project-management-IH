// authSlice.ts

import { getToken } from "@/helpers/localstorage.helper";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  // Other authentication-related state can be stored here
}

const initialState: AuthState = {
  isLoggedIn: getToken() ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    // Other authentication-related actions can be defined here
  },
});

export const { setLoggedIn } = authSlice.actions;
export default authSlice.reducer;
