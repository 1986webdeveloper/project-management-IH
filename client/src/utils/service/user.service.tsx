import { API_LIST } from '@/config/api.config';
import { UserDTO } from '@/types/auth.types';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RequestHelper } from '../helper/request.helper';
import { successToastHelper, errorToastHelper } from '../helper/toast.helper';
import { setUserList } from '@/store/slices/userSlice';

interface createUserProps {
	payload: UserDTO;
	setOpen: (e: boolean) => void;
	dispatch: Dispatch<UnknownAction>;

	setLoading: (e: boolean) => void;
}
interface updateUserProps {
	payload: UserDTO;
	setIsEdit: (e: boolean) => void;
	setOpen: (e: boolean) => void;
	dispatch: Dispatch<UnknownAction>;
	setLoading: (e: boolean) => void;
}
interface getUserListProps {
	dispatch: Dispatch<UnknownAction>;
	setLoading: (e: boolean) => void;
}
interface deleteUserProps {
	userId: string;
	setLoading: (e: boolean) => void;
	dispatch: Dispatch<UnknownAction>;
}
const UserService = () => {
	const createUser = ({ dispatch, payload, setLoading, setOpen }: createUserProps) => {
		setLoading(true);
		axios(RequestHelper('POST', API_LIST.CREATE_USER, { payload }))
			.then((response: any) => {
				const _data = response.data;
				getUserList({ dispatch, setLoading });
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

	const updateUser = ({ dispatch, payload, setIsEdit, setLoading, setOpen }: updateUserProps) => {
		setLoading(true);
		axios(
			RequestHelper('PUT', API_LIST.UPDATE_USER + `${payload._id}`, {
				payload: payload,
			}),
		)
			.then((response: any) => {
				const _data = response.data;
				getUserList({ dispatch, setLoading });
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

	const getUserList = ({ dispatch, setLoading }: getUserListProps) => {
		setLoading(true);
		axios(RequestHelper('GET', API_LIST.GET_USER))
			.then((response: any) => {
				const _data: any = response.data.data;
				dispatch(setUserList(_data));
				setLoading(false);
			})
			.catch(error => {
				const errorMessage = error?.response?.data?.error;
				errorToastHelper(errorMessage);
				setLoading(false);
			});
	};

	const deleteUser = ({ userId, dispatch, setLoading }: deleteUserProps) => {
		setLoading(true);
		axios(RequestHelper('DELETE', API_LIST.DELETE_USER + `${userId}`))
			.then((response: any) => {
				const _data = response.data;
				getUserList({ dispatch, setLoading });
				setLoading(false);
				successToastHelper(_data?.response?.message);
			})
			.catch(error => {
				const errorMessage = error?.response?.data?.error;
				errorToastHelper(errorMessage);
				setLoading(false);
			});
	};
	return { createUser, updateUser, deleteUser, getUserList };
};

export default UserService;
