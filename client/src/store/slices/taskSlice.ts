import { TaskDTO } from '@/types/fieldTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TaskState {
	taskList: TaskDTO[];
	// Other authentication-related state can be stored here
}

const initialState: TaskState = {
	taskList: [] as TaskDTO[],
};

const taskSlice = createSlice({
	name: 'taskList',
	initialState,
	reducers: {
		setTaskList: (state, action: PayloadAction<TaskDTO[]>) => {
			state.taskList = action.payload;
		},
		// Other authentication-related actions can be defined here
	},
});

export const { setTaskList } = taskSlice.actions;
export default taskSlice.reducer;
