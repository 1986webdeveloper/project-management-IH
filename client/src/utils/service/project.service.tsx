/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { API_LIST } from '../../config/api.config';
import { RequestHelper } from '../helper/request.helper';
import { Dispatch } from 'react';
import { UnknownAction } from '@reduxjs/toolkit';
import { setProjectList } from '@/store/slices/projectSlice';
import { errorToastHelper, successToastHelper } from '../helper/toast.helper';

interface createProjectProps {
	payload: any;
	setOpen: (e: boolean) => void;
	dispatch: Dispatch<UnknownAction>;

	setLoading: (e: boolean) => void;
}
interface updateProjectProps {
	payload: any;
	setIsEdit: (e: boolean) => void;
	setOpen: (e: boolean) => void;

	dispatch: Dispatch<UnknownAction>;
	setLoading: (e: boolean) => void;
}
interface getProjectListProps {
	dispatch: Dispatch<UnknownAction>;
	setLoading: (e: boolean) => void;
}

interface DeleteProjectProps {
	projectId: string;
	setLoading: (e: boolean) => void;
	dispatch: Dispatch<UnknownAction>;
}

const ProjectService = () => {
	const CreateProject = ({ payload, setOpen, dispatch, setLoading }: createProjectProps) => {
		setLoading(true);
		axios(RequestHelper('POST', API_LIST.CREATE_PROJECT, { payload: payload }))
			.then((response: any) => {
				const _data = response.data;
				GetProject({ dispatch, setLoading });
				setOpen(false);
				setLoading(false);
				successToastHelper(_data?.response?.message);
			})
			.catch((error: any) => {
				const errorMessage = error?.response?.data?.response?.message;
				errorToastHelper(errorMessage, 'CreateProjectError');
				setLoading(false);
			});
	};

	const UpdateProject = ({ payload, setOpen, setIsEdit, dispatch, setLoading }: updateProjectProps) => {
		setLoading(true);
		axios(
			RequestHelper('PUT', API_LIST.UPDATE_PROJECT + `${payload._id}`, {
				payload: payload,
			}),
		)
			.then((response: any) => {
				const _data = response.data;
				GetProject({ dispatch, setLoading });
				setOpen(false);
				setIsEdit(false);
				setLoading(false);
				successToastHelper(_data?.response?.message);
			})
			.catch((error: any) => {
				const errorMessage = error?.response?.data?.response?.message;
				errorToastHelper(errorMessage, 'updateProjectError');
				setLoading(false);
			});
	};

	const GetProject = ({ dispatch, setLoading }: getProjectListProps) => {
		setLoading(true);
		axios(RequestHelper('GET', API_LIST.GET_PROJECT))
			.then((response: any) => {
				const _data: any = response.data.data;
				dispatch(setProjectList(_data));
				setLoading(false);
			})
			.catch((error: any) => {
				const errorMessage = error?.response?.data?.response?.message;
				console.log(errorMessage);
				errorToastHelper(errorMessage);
				setLoading(false);
			});
	};

	const DeleteProject = ({ projectId, setLoading, dispatch }: DeleteProjectProps) => {
		setLoading(true);
		axios(RequestHelper('DELETE', API_LIST.DELETE_PROJECT + `${projectId}`))
			.then((response: any) => {
				const _data = response.data;
				GetProject({ dispatch, setLoading });
				setLoading(false);
				successToastHelper(_data?.response?.message);
			})
			.catch((error: any) => {
				const errorMessage = error?.response?.data?.response?.message;
				errorToastHelper(errorMessage, 'DeleteProjectError');
				setLoading(false);
			});
	};

	return {
		CreateProject,
		UpdateProject,
		GetProject,
		DeleteProject,
	};
};

export default ProjectService;
