import axios from 'axios';
import { API_LIST } from '../../config/api.config';
import { RequestHelper } from '../helper/request.helper';
import { Dispatch } from 'react';
import { UnknownAction } from '@reduxjs/toolkit';
import { setClientList } from '@/store/slices/clientSlice';
import { ClientDTO } from '@/types/fieldTypes';
import { errorToastHelper, successToastHelper } from '../helper/toast.helper';

interface createClientProps {
	payload: ClientDTO;
	setOpen: (e: boolean) => void;
	dispatch: Dispatch<UnknownAction>;
	setLoading: (e: boolean) => void;
}
interface updateClientProps {
	payload: ClientDTO;
	setIsEdit: (e: boolean) => void;
	setOpen: (e: boolean) => void;
	dispatch: Dispatch<UnknownAction>;
	setLoading: (e: boolean) => void;
}
interface getClientListProps {
	dispatch: Dispatch<UnknownAction>;
	setLoading: (e: boolean) => void;
}
interface DeleteClientProps {
	clientId: string;
	setLoading: (e: boolean) => void;
	dispatch: Dispatch<UnknownAction>;
}

const ClientService = () => {
	const CreateClient = ({ payload, setOpen, dispatch, setLoading }: createClientProps) => {
		setLoading(true);
		axios(RequestHelper('POST', API_LIST.CREATE_CLIENT, { payload }))
			.then((response: any) => {
				const _data = response.data;
				GetClient({ dispatch, setLoading });
				setOpen(false);
				setLoading(false);
				successToastHelper(_data?.response?.message);
			})
			.catch((error: any) => {
				const errorMessage = error?.response?.data?.response?.message;
				errorToastHelper(errorMessage, 'createClientError');
				setLoading(false);
			});
	};

	const UpdateClient = ({ payload, setIsEdit, setOpen, dispatch, setLoading }: updateClientProps) => {
		setLoading(true);
		axios(
			RequestHelper('PUT', API_LIST.UPDATE_CLIENT + `${payload._id}`, {
				payload: payload,
			}),
		)
			.then((response: any) => {
				const _data = response.data;
				GetClient({ dispatch, setLoading });
				setOpen(false);
				setIsEdit(false);
				setLoading(false);
				successToastHelper(_data?.response?.message);
			})
			.catch((error: any) => {
				const errorMessage = error?.response?.data?.response?.message;
				errorToastHelper(errorMessage, 'updateClientError');
				setLoading(false);
			});
	};

	const GetClient = ({ dispatch, setLoading }: getClientListProps) => {
		setLoading(true);
		axios(RequestHelper('GET', API_LIST.GET_CLIENT))
			.then((response: any) => {
				const _data: any = response.data.data;
				dispatch(setClientList(_data));
				setLoading(false);
			})
			.catch((error: any) => {
				const errorMessage = error?.response?.data?.response?.message;
				errorToastHelper(errorMessage, 'getClientError');
				setLoading(false);
			});
	};

	const DeleteClient = ({ clientId, setLoading, dispatch }: DeleteClientProps) => {
		setLoading(true);
		axios(RequestHelper('DELETE', API_LIST.DELETE_CLIENT + `${clientId}`))
			.then((response: any) => {
				const _data = response.data;
				GetClient({ dispatch, setLoading });
				setLoading(false);
				successToastHelper(_data?.response?.message);
			})
			.catch((error: any) => {
				const errorMessage = error?.response?.data?.response?.message;
				errorToastHelper(errorMessage, 'DeleteClientError');
				setLoading(false);
			});
	};

	return {
		CreateClient,
		UpdateClient,
		GetClient,
		DeleteClient,
	};
};

export default ClientService;
