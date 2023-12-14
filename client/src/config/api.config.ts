// Local URL
export const BASEURL = 'http://192.168.1.60:7000';

//Production OR Live
// export const BASEURL = "http://192.168.1.60:7000";

export const API_LIST = {
	LOGIN: `${BASEURL}/auth/login/`,
	SIGNUP: `${BASEURL}/auth/signup/`,
	PROJECT: `${BASEURL}/project/`,
	CREATEPROJECT: `${BASEURL}/project/create`,
	UPDATEPROJECT: `${BASEURL}/project/update/`,
	GETPROJECT: `${BASEURL}/project/get`,
	CREATECLIENT: `${BASEURL}/client/create`,
	UPDATECLIENT: `${BASEURL}/client/update/`,
	GETCLIENT: `${BASEURL}/client/`,
};
