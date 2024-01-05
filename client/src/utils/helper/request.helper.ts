/* eslint-disable @typescript-eslint/no-explicit-any */
import { getToken } from './localstorage.helper';

export const RequestHelper = (
	method: 'GET' | 'POST' | 'PUT' | 'DELETE',
	url: string,
	options?: { payload?: any; token?: string },
) => {
	const obj: any = {
		method: method,
		url: url,
		headers: {},
	};

	if (method === 'POST' || method === 'PUT') {
		obj.headers.Authorization = `Bearer ${options?.token ?? getToken()}`;
		obj.data = options?.payload;
	}

	if (method === 'GET' || 'DELETE') {
		obj.headers.Authorization = `Bearer ${options?.token ?? getToken()}`;
	}

	return obj;
};
