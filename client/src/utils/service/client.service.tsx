import axios from "axios";
import { API_LIST } from "../../config/api.config";
import { RequestHelper } from "../helper/request.helper";
import { Dispatch } from "react";
import { UnknownAction } from "@reduxjs/toolkit";
import { setClientList } from "@/store/slices/clientSlice";
import { ClientDTO } from "@/types/fieldTypes";
import { errorToastHelper, successToastHelper } from "../helper/toast.helper";

interface createClientProps {
  payload: ClientDTO;
  setOpen: (e: boolean) => void;
}
interface updateClientProps {
  payload: ClientDTO;
  setIsEdit: (e: boolean) => void;
  setOpen: (e: boolean) => void;
}

interface DeleteClientProps {
  clientId: string;
}

interface ClientServiceProps {
  setLoading: (e: boolean) => void;
  dispatch: Dispatch<UnknownAction>;
}

const ClientService = ({ dispatch, setLoading }: ClientServiceProps) => {
  const CreateClient = async ({ payload, setOpen }: createClientProps) => {
    setLoading(true);

    await axios(RequestHelper("POST", API_LIST.CREATE_CLIENT, { payload }))
      .then((response: any) => {
        const _data = response.data;
        GetClient();
        setOpen(false);
        setLoading(false);
        successToastHelper(_data?.response?.message);
      })
      .catch((error: any) => {
        const errorMessage = error?.response?.data?.response?.message;
        errorToastHelper(errorMessage, "createClientError");
        setLoading(false);
      });
  };

  const UpdateClient = async ({
    payload,
    setIsEdit,
    setOpen,
  }: updateClientProps) => {
    setLoading(true);
    await axios(
      RequestHelper("PUT", API_LIST.UPDATE_CLIENT + `${payload._id}`, {
        payload: payload,
      }),
    )
      .then(async (response: any) => {
        const _data = response.data;
        await GetClient();
        setOpen(false);
        setIsEdit(false);
        setLoading(false);
        successToastHelper(_data?.response?.message);
      })
      .catch((error: any) => {
        const errorMessage = error?.response?.data?.response?.message;
        errorToastHelper(errorMessage, "updateClientError");
        setLoading(false);
      });
  };

  const GetClient = async () => {
    setLoading(true);
    await axios(RequestHelper("GET", API_LIST.GET_CLIENT))
      .then((response: any) => {
        const _data: any = response.data.data;
        dispatch(setClientList(_data));
        setLoading(false);
      })
      .catch((error: any) => {
        const errorMessage = error?.response?.data?.response?.message;
        errorToastHelper(errorMessage, "getClientError");
        setLoading(false);
      });
  };

  const DeleteClient = async ({ clientId }: DeleteClientProps) => {
    setLoading(true);
    await axios(RequestHelper("DELETE", API_LIST.DELETE_CLIENT + `${clientId}`))
      .then((response: any) => {
        const _data = response.data;
        GetClient();
        setLoading(false);
        successToastHelper(_data?.response?.message);
      })
      .catch((error: any) => {
        const errorMessage = error?.response?.data?.response?.message;
        errorToastHelper(errorMessage, "DeleteClientError");
        setLoading(false);
      });
  };

  return {
    CreateClient,
    UpdateClient,
    GetClient,
    DeleteClient,
  };
};

export default ClientService;
