import { ClientDTO } from '@/types/fieldTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ClientState {
	clientList: ClientDTO[];
	// Other authentication-related state can be stored here
}

const initialState: ClientState = {
	clientList: [] as ClientDTO[],
};

const clientSlice = createSlice({
	name: 'clientList',
	initialState,
	reducers: {
		setClientList: (state, action: PayloadAction<ClientDTO[]>) => {
			state.clientList = action.payload;
		},
		// Other authentication-related actions can be defined here
	},
});

export const { setClientList } = clientSlice.actions;
export default clientSlice.reducer;
