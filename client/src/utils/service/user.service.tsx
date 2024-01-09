import { API_LIST } from "@/config/api.config";
import { UserDTO } from "@/types/auth.types";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RequestHelper } from "../helper/request.helper";
import { successToastHelper, errorToastHelper } from "../helper/toast.helper";
import {
  setEmployeeList,
  setManagerList,
  setUserList,
} from "@/store/slices/userSlice";
import { USER_ROLES } from "@/constants/user.constant";

interface createUserProps {
  payload: UserDTO;
  setOpen: (e: boolean) => void;
}
interface updateUserProps {
  payload: UserDTO;
  setIsEdit: (e: boolean) => void;
  setOpen: (e: boolean) => void;
}

interface deleteUserProps {
  userId: string;
}
interface getUserListProps {
  role?: string;
}

interface UserServiceProps {
  setLoading: (e: boolean) => void;
  dispatch: Dispatch<UnknownAction>;
}
const UserService = ({ dispatch, setLoading }: UserServiceProps) => {
  const createUser = async ({ payload, setOpen }: createUserProps) => {
    setLoading(true);
    await axios(RequestHelper("POST", API_LIST.CREATE_USER, { payload }))
      .then((response: any) => {
        const _data = response.data;
        getUserList({});
        setOpen(false);
        setLoading(false);
        successToastHelper(_data?.response?.message);
      })
      .catch((error: any) => {
        const errorMessage = error?.response?.data?.response?.message;
        errorToastHelper(errorMessage, "createUserError");
        setLoading(false);
      });
  };

  const updateUser = async ({
    payload,
    setIsEdit,
    setOpen,
  }: updateUserProps) => {
    setLoading(true);
    await axios(
      RequestHelper("PUT", API_LIST.UPDATE_USER + `${payload._id}`, {
        payload: payload,
      }),
    )
      .then((response: any) => {
        const _data = response.data;
        getUserList({});
        setOpen(false);
        setIsEdit(false);
        setLoading(false);
        successToastHelper(_data?.response?.message);
      })
      .catch((error: any) => {
        const errorMessage = error?.response?.data?.response?.message;
        errorToastHelper(errorMessage, "updateUserError");
        setLoading(false);
      });
  };

  const getUserList = async ({ role }: getUserListProps) => {
    const url = role ? `${API_LIST.GET_USER}?role=${role}` : API_LIST.GET_USER;

    setLoading(true);
    await axios(RequestHelper("GET", url))
      .then((response: any) => {
        const _data: any = response.data.data;
        if (role === USER_ROLES.EMPLOYEE) {
          dispatch(setEmployeeList(_data));
          setLoading(false);
        } else if (role === USER_ROLES.MANAGER) {
          dispatch(setManagerList(_data));
          setLoading(false);
        } else {
          dispatch(setUserList(_data));
          setLoading(false);
        }
      })
      .catch((error: any) => {
        const errorMessage = error?.response?.data?.response?.message;
        errorToastHelper(errorMessage, "getUserError");
        setLoading(false);
      });
  };

  const deleteUser = async ({ userId }: deleteUserProps) => {
    setLoading(true);
    await axios(RequestHelper("DELETE", API_LIST.DELETE_USER + `${userId}`))
      .then((response: any) => {
        const _data = response.data;
        getUserList({});
        setLoading(false);
        successToastHelper(_data?.response?.message);
      })
      .catch((error: any) => {
        const errorMessage = error?.response?.data?.response?.message;
        errorToastHelper(errorMessage, "deleteUserError");
        setLoading(false);
      });
  };
  return { createUser, updateUser, deleteUser, getUserList };
};

export default UserService;
