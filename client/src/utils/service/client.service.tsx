/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { API_LIST } from '../../config/api.config';
import { RequestHelper } from '../helper/request.helper';
import { ROUTES } from '@/constants/routes.constants';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Dispatch } from 'react';
import { UnknownAction } from '@reduxjs/toolkit';
import { setClientList } from '@/store/slices/clientSlice';

interface createClientProps {
	payload: any;
}
interface updateClientProps {
	payload: any;
	ClientId: string;
}
interface getClientListProps {
	dispatch: Dispatch<UnknownAction>;
}

const ClientService = () => {
	const navigate = useNavigate();
	const CreateClient = ({ payload }: createClientProps) => {
		const _payload = {
			...payload,
			clientId: '6571b5200b544c626e7d46a9',
		};
		axios(RequestHelper('POST', API_LIST.CREATECLIENT, { payload: _payload }))
			.then((response: any) => {
				const _data = response.data;
				console.log(_data);
				navigate(ROUTES.CLIENT);
			})
			.catch(error => {
				const errorMessege = error?.response?.data?.error;
				toast(errorMessege ?? error.message, { type: 'error' });
			});
	};

	const UpdateClient = ({ payload, ClientId }: updateClientProps) => {
		const _payload = {
			...payload,
			clientId: '6571b5200b544c626e7d46a9',
		};

		axios(
			RequestHelper('PUT', API_LIST.UPDATECLIENT + `${ClientId}`, {
				payload: _payload,
			}),
		)
			.then((response: any) => {
				const _data = response.data;
				console.log(_data);
				navigate(ROUTES.CLIENT);
			})
			.catch(error => {
				const errorMessege = error?.response?.data?.error;
				toast(errorMessege ?? error.message, { type: 'error' });
			});
	};

	const GetClient = ({ dispatch }: getClientListProps) => {
		axios(RequestHelper('GET', API_LIST.GETCLIENT))
			.then((response: any) => {
				const _data: any = response.data.data;
				console.log(_data, '-----');
				dispatch(setClientList(_data));
				navigate(ROUTES.CLIENT);
			})
			.catch(error => {
				const errorMessege = error?.response?.data?.error;
				toast(errorMessege ?? error.message, { type: 'error' });
			});
	};

	return {
		CreateClient,
		UpdateClient,
		GetClient,
	};
};

export default ClientService;
