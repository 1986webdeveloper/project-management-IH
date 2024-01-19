/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserDTO, UserLogInDTO } from "../../types/auth.types";
import axios from "axios";
import { API_LIST } from "../../config/api.config";
import { RequestHelper } from "../helper/request.helper";
import { UnknownAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { setLoggedIn, setLoggedUser } from "@/store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes.constants";
import { RemoveToken, setToken } from "../helper/localstorage.helper";
import { errorToastHelper, successToastHelper } from "../helper/toast.helper";
import { setClientList } from "@/store/slices/clientSlice";
import { setTaskList } from "@/store/slices/taskSlice";
import { setProjectList } from "@/store/slices/projectSlice";
import { setUserList } from "@/store/slices/userSlice";

interface LoginServiceProps {
  payload: UserLogInDTO;
}

interface SignUpProps {
  payload: UserDTO;
}

interface AuthServiceProps {
  dispatch?: Dispatch<UnknownAction>;
  setLoading?: (e: boolean) => void;
}
interface forgotPasswordProps {
  email: string;
}

const AuthServices = ({ dispatch, setLoading }: AuthServiceProps) => {
  const navigate = useNavigate();

  const SignUpService = async ({ payload }: SignUpProps) => {
    setLoading && setLoading(true);
    await axios(RequestHelper("POST", API_LIST.SIGN_UP, { payload: payload }))
      .then((response: any) => {
        const _data = response.data;
        setLoading && setLoading(false);
        navigate(ROUTES.LOGIN);
        successToastHelper(_data?.response?.message);
      })
      .catch((error: any) => {
        const errorMessage = error?.response?.data?.response?.message;
        errorToastHelper(errorMessage, "signUpError");
        setLoading && setLoading(false);
      });
  };

  const LoginServices = async ({ payload }: LoginServiceProps) => {
    setLoading && setLoading(true);
    await axios(RequestHelper("POST", API_LIST.LOGIN, { payload: payload }))
      .then((response: any) => {
        const { data } = response.data;
        const token = data.accessToken;
        const user: UserDTO = data;
        dispatch && dispatch(setLoggedIn(true));
        dispatch && dispatch(setLoggedUser(user));
        navigate(ROUTES.DASHBOARD);
        setToken(token);
        setLoading && setLoading(false);
        successToastHelper(response.data?.response?.message);
      })
      .catch((error: any) => {
        console.log(error);
        const errorMessage = error?.response?.data?.response?.message;
        errorToastHelper(errorMessage, "loginError");
        setLoading && setLoading(false);
      });
  };

  const ForgotPasswordService = async ({ email }: forgotPasswordProps) => {
    setLoading && setLoading(true);
    await axios(
      RequestHelper("POST", API_LIST.FORGOT_PASSWORD, {
        payload: { email: email },
      }),
    )
      .then((response: any) => {
        const _data = response.data;
        navigate(ROUTES.LOGIN);
        successToastHelper(_data?.response?.message);
      })
      .catch((error: any) => {
        const errorMessage = error?.response?.data?.response?.message;
        errorToastHelper(errorMessage, "forgotPassError");
        setLoading && setLoading(false);
      });
  };

  const LogoutService = () => {
    // todo :- to add Api for this and helper function to reset  all the states once for all.
    RemoveToken();
    dispatch && dispatch(setLoggedIn(false));
    dispatch && dispatch(setLoggedUser({} as UserDTO));
    dispatch && dispatch(setClientList([]));
    dispatch && dispatch(setTaskList([]));
    dispatch && dispatch(setProjectList([]));
    dispatch && dispatch(setUserList([]));
    navigate(ROUTES.LOGIN);
  };

  const getCurrentUserService = async () => {
    setLoading && setLoading(true);
    await axios(RequestHelper("GET", API_LIST.CURRENT_USER))
      .then((response: any) => {
        const { data } = response.data;
        dispatch && dispatch(setLoggedUser(data));
        dispatch && dispatch(setLoggedIn(true));
        setLoading && setLoading(false);
      })
      .catch((error: any) => {
        const errorMessage = error?.response?.data?.response?.message;
        errorToastHelper(errorMessage, "currentUserError");
        setLoading && setLoading(false);
        LogoutService();
      });
  };

  return {
    LoginServices,
    SignUpService,
    ForgotPasswordService,
    LogoutService,
    getCurrentUserService,
  };
};

export default AuthServices;
