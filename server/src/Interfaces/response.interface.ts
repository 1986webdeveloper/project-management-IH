export interface ResponseDTO {
	statusCode: number;
	message: string;
	status: 'Success' | 'Error';
}

export interface SuccessResponseDTO {
	response: ResponseDTO;
	data: any;
}

export interface ErrorResponseDTO {
	response: ResponseDTO;
	error: any;
}

export interface SuccessResponseParameters {
	statusCode: number;
	status: 'Success' | 'Error';
	message: string;
	data?: any;
}

export interface ErrorResponseParameters {
	statusCode: number;
	status: 'Success' | 'Error';
	message: string;
	error?: any;
}
