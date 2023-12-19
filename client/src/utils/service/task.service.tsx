import { API_LIST } from '@/config/api.config';
import { TaskDTO } from '@/types/fieldTypes';
import { UnknownAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Dispatch } from 'react';
import { RequestHelper } from '../helper/request.helper';
import { errorToastHelper, successToastHelper } from '../helper/toast.helper';
import { setTaskList } from '@/store/slices/taskSlice';

interface createTaskProps {
	payload: TaskDTO;
	setOpen: (e: boolean) => void;
	dispatch: Dispatch<UnknownAction>;
	setLoading: (e: boolean) => void;
}
interface updateTaskProps {
	payload: TaskDTO;
	setIsEdit: (e: boolean) => void;
	setOpen: (e: boolean) => void;
	dispatch: Dispatch<UnknownAction>;
	setLoading: (e: boolean) => void;
}
interface getTaskListProps {
	dispatch: Dispatch<UnknownAction>;
	setLoading: (e: boolean) => void;
}
interface deleteTaskProps {
	taskId: string;
	setLoading: (e: boolean) => void;
	dispatch: Dispatch<UnknownAction>;
}

const TaskService = () => {
	const CreateTask = ({ dispatch, payload, setLoading, setOpen }: createTaskProps) => {
		setLoading(true);
		axios(RequestHelper('POST', API_LIST.CREATE_TASK, { payload }))
			.then((response: any) => {
				const _data = response.data;
				getTaskList({ dispatch, setLoading });
				setOpen(false);
				setLoading(false);
				successToastHelper(_data?.response?.message);
			})
			.catch(error => {
				const errorMessage = error?.response?.data?.error;
				errorToastHelper(errorMessage);
				setLoading(false);
			});
	};
	const UpdateTask = ({ dispatch, payload, setIsEdit, setLoading, setOpen }: updateTaskProps) => {
		setLoading(true);
		axios(
			RequestHelper('PUT', API_LIST.UPDATE_TASK + `${payload._id}`, {
				payload: payload,
			}),
		)
			.then((response: any) => {
				const _data = response.data;
				getTaskList({ dispatch, setLoading });
				setOpen(false);
				setIsEdit(false);
				setLoading(false);
				successToastHelper(_data?.response?.message);
			})
			.catch(error => {
				const errorMessage = error?.response?.data?.error;
				errorToastHelper(errorMessage);
				setLoading(false);
			});
	};
	const getTaskList = ({ dispatch, setLoading }: getTaskListProps) => {
		setLoading(true);
		axios(RequestHelper('GET', API_LIST.GET_TASK))
			.then((response: any) => {
				const _data: any = response.data.data;
				dispatch(setTaskList(_data));
				setLoading(false);
			})
			.catch(error => {
				const errorMessage = error?.response?.data?.error;
				errorToastHelper(errorMessage);
				setLoading(false);
			});
	};
	const deleteTask = ({ taskId, dispatch, setLoading }: deleteTaskProps) => {
		setLoading(true);
		axios(RequestHelper('DELETE', API_LIST.DELETE_TASK + `${taskId}`))
			.then((response: any) => {
				const _data = response.data;
				getTaskList({ dispatch, setLoading });
				setLoading(false);
				successToastHelper(_data?.response?.message);
			})
			.catch(error => {
				const errorMessage = error?.response?.data?.error;
				errorToastHelper(errorMessage);
				setLoading(false);
			});
	};

	return { CreateTask, UpdateTask, deleteTask, getTaskList };
};

export default TaskService;
