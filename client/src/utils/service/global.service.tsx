import { API_LIST } from '@/config/api.config';
import { setProjectList } from '@/store/slices/projectSlice';
import axios from 'axios';
import { Dispatch } from 'react';
import { UnknownAction } from 'redux';
import { RequestHelper } from '../helper/request.helper';
import { errorToastHelper } from '../helper/toast.helper';
import { setUserList } from '@/store/slices/userSlice';
import { setClientList } from '@/store/slices/clientSlice';
import { setTaskList } from '@/store/slices/taskSlice';

interface getAllDataProps {
	dispatch: Dispatch<UnknownAction>;
	setLoading: (e: boolean) => void;
}

const GlobalService = () => {
	const getAllData = async ({ dispatch, setLoading }: getAllDataProps) => {
		setLoading(true);
		await axios(RequestHelper('GET', API_LIST.GET_DATA))
			.then((response: any) => {
				const _data: any = response?.data?.data;
				dispatch(setUserList(_data?.users));
				dispatch(setProjectList(_data?.projects));
				dispatch(setClientList(_data?.clients));
				dispatch(setTaskList(_data?.tasks));
				setLoading(false);
			})
			.catch((error: any) => {
				const errorMessage = error?.response?.data?.response?.message;
				errorToastHelper(errorMessage);
				setLoading(false);
			});
	};

	return { getAllData };
};

export default GlobalService;
