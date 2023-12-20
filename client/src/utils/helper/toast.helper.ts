import { toast } from 'react-toastify';

export const successToastHelper = (message: string, id?: string) => {
	toast(message ? message : 'Success', {
		type: 'success',
		position: 'top-center',
		toastId: id,
	});
};

export const errorToastHelper = (error: string, id?: string) => {
	toast(error ? error : 'Request not processed', {
		type: 'error',
		position: 'top-center',
		toastId: id,
	});
};
