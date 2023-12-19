/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserLogInDTO } from '../../types/auth.types';
import axios from 'axios';
import { API_LIST } from '../../config/api.config';
import { RequestHelper } from '../helper/request.helper';
import { UnknownAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { setLoggedIn } from '@/store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes.constants';
import { setToken } from '../helper/token.helper';
import { errorToastHelper, successToastHelper } from '../helper/toast.helper';

interface LoginServiceProps {
	payload: UserLogInDTO;
	dispatch: Dispatch<UnknownAction>;
	setLoading: (e: boolean) => void;
}

interface SignUpProps {
	payload: UserLogInDTO;
	setLoading: (e: boolean) => void;
}

interface forgotPasswordProps {
	email: string;
	setLoading: (e: boolean) => void;
}

const AuthServices = () => {
	const navigate = useNavigate();

	const SignUpService = ({ payload, setLoading }: SignUpProps) => {
		setLoading(true);
		axios(RequestHelper('POST', API_LIST.SIGN_UP, { payload: payload }))
			.then((response: any) => {
				const _data = response.data;
				setLoading(false);
				navigate(ROUTES.LOGIN);
				successToastHelper(_data?.response?.message);
			})
			.catch(error => {
				const errorMessage = error?.response?.data?.error;
				errorToastHelper(errorMessage);
				setLoading(false);
			});
	};

	const LoginServices = ({ payload, dispatch, setLoading }: LoginServiceProps) => {
		setLoading(true);
		axios(RequestHelper('POST', API_LIST.LOGIN, { payload: payload }))
			.then((response: any) => {
				const _data = response.data;
				const token = _data.data.accessToken;
				dispatch(setLoggedIn(true));
				navigate(ROUTES.HOME);
				setToken(token);
				setLoading(false);
				successToastHelper(_data?.response?.message);
			})
			.catch(error => {
				const errorMessage = error?.response?.data?.error;
				errorToastHelper(errorMessage);
				setLoading(false);
			});
	};

	const ForgotPasswordService = ({ email, setLoading }: forgotPasswordProps) => {
		setLoading(true);
		axios(RequestHelper('POST', API_LIST.FORGOT_PASSWORD, { payload: { email: email } }))
			.then((response: any) => {
				const _data = response.data;
				navigate(ROUTES.LOGIN);
				successToastHelper(_data?.response?.message);
			})
			.catch(error => {
				const errorMessage = error?.response?.data?.error;
				errorToastHelper(errorMessage);
				setLoading(false);
			});
	};

	return {
		LoginServices,
		SignUpService,
		ForgotPasswordService,
	};
};

export default AuthServices;
