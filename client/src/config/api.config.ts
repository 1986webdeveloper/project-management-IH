// Local URL
export const BASEURL = "http://192.168.1.60:7000";

export const MODULES = {
  AUTH: `${BASEURL}/auth`,
  PROJECT: `${BASEURL}/project`,
  CLIENT: `${BASEURL}/client`,
};

export const API_LIST = {
  LOGIN: `${MODULES.AUTH}/login/`,
  SIGNUP: `${MODULES.AUTH}/signup/`,
  CREATE_PROJECT: `${MODULES.PROJECT}/create`,
  UPDATE_PROJECT: `${MODULES.PROJECT}/update/`,
  GET_PROJECT: `${MODULES.PROJECT}/get`,
  DELETE_PROJECT: `${MODULES.PROJECT}/delete/`,
  CREATE_CLIENT: `${MODULES.CLIENT}/create`,
  UPDATE_CLIENT: `${MODULES.CLIENT}/update/`,
  GET_CLIENT: `${MODULES.CLIENT}/get`,
  DELETE_CLIENT: `${MODULES.CLIENT}/delete/`,
};
