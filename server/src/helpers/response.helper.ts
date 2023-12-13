import {
	SuccessResponseDTO,
	ErrorResponseDTO,
	SuccessResponseParameters,
	ErrorResponseParameters,
} from '../Interfaces/response.interface';

export const successResponseHelper = ({ message, status, statusCode, data }: SuccessResponseParameters) => {
	const _res: SuccessResponseDTO = {
		data: data ? data : {},
		response: {
			statusCode: statusCode,
			message: message,
			status: 'Success',
		},
	};

	return _res;
};

export const errorResponseHelper = ({ message, status, statusCode, error }: ErrorResponseParameters) => {
	const _res: ErrorResponseDTO = {
		error: error ? error : 'Something went wrong',
		response: {
			message: message,
			statusCode: statusCode,
			status: 'Error',
		},
	};

	return _res;
};
