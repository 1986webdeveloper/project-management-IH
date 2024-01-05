// authSlice.ts

import { UserDTO } from '@/types/auth.types';
import { getToken } from '@/utils/helper/localstorage.helper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
	isLoggedIn: boolean;
	loggedUser: UserDTO;
	// Other authentication-related state can be stored here
}

const initialState: AuthState = {
	isLoggedIn: getToken() ? true : false,
	loggedUser: {} as UserDTO,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setLoggedIn: (state: any, action: PayloadAction<boolean>) => {
			state.isLoggedIn = action.payload;
		},
		setLoggedUser: (state: any, action: PayloadAction<UserDTO>) => {
			state.loggedUser = action.payload;
		},
	},
});

/**
 * Handle expired token error
 * @handleExpiredToken
 * @returns
 */

export const { setLoggedIn, setLoggedUser } = authSlice.actions;
export default authSlice.reducer;
