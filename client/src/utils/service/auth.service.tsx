/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserLogInDTO } from "../../types/auth.types";
import axios from "axios";
import { API_LIST } from "../../config/api.config";
import { toast } from "react-toastify";
import { RequestHelper } from "../helper/request.helper";
import { UnknownAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { setLoggedIn } from "@/store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes.constants";
import { setToken } from "../helper/token.helper";

interface LoginServiceProps {
  payload: UserLogInDTO;
  dispatch: Dispatch<UnknownAction>;
}

interface SignUpProps {
  payload: UserLogInDTO;
}

const AuthServices = () => {
  const navigate = useNavigate();

  const SignUpService = ({ payload }: SignUpProps) => {
    axios(RequestHelper("POST", API_LIST.SIGNUP, { payload: payload }))
      .then((response: any) => {
        const _data = response.data;
        console.log(_data);
        navigate(ROUTES.LOGIN);
      })
      .catch((error) => {
        const errorMessege = error?.response?.data?.error;
        toast(errorMessege ?? error.message, { type: "error" });
      });
  };

  const LoginServices = ({ payload, dispatch }: LoginServiceProps) => {
    axios(RequestHelper("POST", API_LIST.LOGIN, { payload: payload }))
      .then((response: any) => {
        const _data = response.data;
        const token = _data.data.accessToken;

        dispatch(setLoggedIn(true));
        navigate(ROUTES.HOME);
        setToken(token);
        toast("setLoggedIn", { type: "success" });
      })
      .catch((error) => {
        const errorMessege = error?.response?.data?.error;
        toast(errorMessege ?? error.message, { type: "error" });
      });
  };

  return {
    LoginServices,
    SignUpService,
  };
};

export default AuthServices;
