// Local URL
export const BASEURL = 'http://192.168.1.60:7000';

export const MODULES = {
	AUTH: `${BASEURL}/auth`,
	PROJECT: `${BASEURL}/project`,
	CLIENT: `${BASEURL}/client`,
	TASK: `${BASEURL}/task`,
	USER: `${BASEURL}/user`,
	GLOBAL: `${BASEURL}/global`,
};

export const API_LIST = {
	LOGIN: `${MODULES.AUTH}/login/`,
	SIGN_UP: `${MODULES.AUTH}/signup/`,
	FORGOT_PASSWORD: `${MODULES.AUTH}/forgot-pass/`,
	GET_DATA: `${MODULES.GLOBAL}/get`,
	CURRENT_USER: `${MODULES.AUTH}/currentUser/`,
	CREATE_PROJECT: `${MODULES.PROJECT}/create`,
	UPDATE_PROJECT: `${MODULES.PROJECT}/update/`,
	GET_PROJECT: `${MODULES.PROJECT}/get`,
	DELETE_PROJECT: `${MODULES.PROJECT}/delete/`,
	CREATE_CLIENT: `${MODULES.CLIENT}/create`,
	UPDATE_CLIENT: `${MODULES.CLIENT}/update/`,
	GET_CLIENT: `${MODULES.CLIENT}/get`,
	DELETE_CLIENT: `${MODULES.CLIENT}/delete/`,
	CREATE_TASK: `${MODULES.TASK}/create`,
	UPDATE_TASK: `${MODULES.TASK}/update/`,
	GET_TASK: `${MODULES.TASK}/get`,
	DELETE_TASK: `${MODULES.TASK}/delete/`,
	CREATE_USER: `${MODULES.USER}/create`,
	UPDATE_USER: `${MODULES.USER}/update/`,
	GET_USER: `${MODULES.USER}/get`,
	DELETE_USER: `${MODULES.USER}/delete/`,
};
