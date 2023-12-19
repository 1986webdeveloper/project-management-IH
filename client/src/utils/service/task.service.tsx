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
	taskList: TaskDTO[];
	setLoading: (e: boolean) => void;
}
interface updateTaskProps {
	payload: TaskDTO;
	setIsEdit: (e: boolean) => void;
	setOpen: (e: boolean) => void;
	dispatch: Dispatch<UnknownAction>;
	taskList: TaskDTO[];
	setLoading: (e: boolean) => void;
}
interface getTaskListProps {
	dispatch: Dispatch<UnknownAction>;
	setLoading: (e: boolean) => void;
}
interface deleteTaskProps {
	taskId: string;
	setLoading: (e: boolean) => void;
	taskList: TaskDTO[];
	dispatch: Dispatch<UnknownAction>;
}

const TaskService = () => {
	const CreateTask = ({ taskList, dispatch, payload, setLoading, setOpen }: createTaskProps) => {
		setLoading(true);
		axios(RequestHelper('POST', API_LIST.CREATE_TASK, { payload }))
			.then((response: any) => {
				const _data = response.data;
				const newList = [...taskList, _data.data];
				dispatch(setTaskList(newList));
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
	const UpdateTask = ({ dispatch, payload, setIsEdit, setLoading, setOpen, taskList }: updateTaskProps) => {
		setLoading(true);
		axios(
			RequestHelper('PUT', API_LIST.UPDATE_TASK + `${payload._id}`, {
				payload: payload,
			}),
		)
			.then((response: any) => {
				const _data = response.data;
				const _allTask = [...taskList];
				const updatedUser = _data.data;
				const index = _allTask.findIndex(obj => obj._id === updatedUser._id);
				if (index !== -1) {
					_allTask.splice(index, 1, updatedUser);
					console.log(_allTask);
					dispatch(setTaskList(_allTask));
				} else throw errorToastHelper('Cannot update the task.');
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
	const deleteTask = ({ taskList, taskId, dispatch, setLoading }: deleteTaskProps) => {
		setLoading(true);
		axios(RequestHelper('DELETE', API_LIST.DELETE_TASK + `${taskId}`))
			.then((response: any) => {
				const _data = response.data;
				const _allTask = [...taskList];
				const index = _allTask.findIndex(obj => obj._id === taskId);
				if (index !== -1) {
					_allTask.splice(index, 1);
					dispatch(setTaskList(_allTask));
				} else throw errorToastHelper('Cannot Delete the task.');
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
