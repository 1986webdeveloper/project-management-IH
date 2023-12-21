// authSlice.ts

import { USER_ROLES } from "@/constants/user.constant";
import { getToken } from "@/utils/helper/localstorage.helper";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  role: String;
  // Other authentication-related state can be stored here
}

const initialState: AuthState = {
  isLoggedIn: getToken() ? true : false,
  role: USER_ROLES.ADMIN,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state: any, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setUserRole: (state: any, action: PayloadAction<string>) => {
      state.role = action.payload;
    },

    // Other authentication-related actions can be defined here
  },
});

/**
 * Handle expired token error
 * @handleExpiredToken
 * @returns
 */

export const { setLoggedIn, setUserRole } = authSlice.actions;
export default authSlice.reducer;
