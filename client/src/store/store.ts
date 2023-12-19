import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import projectReducer from './slices/projectSlice';
import clientReducer from './slices/clientSlice';
import taskReducer from './slices/taskSlice';
import userReducer from './slices/userSlice';

export const makeStore = () => {
	return configureStore({
		reducer: {
			auth: authReducer,
			project: projectReducer,
			client: clientReducer,
			task: taskReducer,
			user: userReducer,
		},
	});
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
