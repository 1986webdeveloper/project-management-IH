import { UserDTO } from '@/types/auth.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
	userList: UserDTO[];
	// Other authentication-related state can be stored here
}

const initialState: UserState = {
	userList: [] as UserDTO[],
};

const UserSlice = createSlice({
	name: 'userList',
	initialState,
	reducers: {
		setUserList: (state, action: PayloadAction<UserDTO[]>) => {
			state.userList = action.payload;
		},
		// Other authentication-related actions can be defined here
	},
});

export const { setUserList } = UserSlice.actions;
export default UserSlice.reducer;
