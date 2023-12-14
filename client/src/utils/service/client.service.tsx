/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { API_LIST } from "../../config/api.config";
import { RequestHelper } from "../helper/request.helper";
import { toast } from "react-toastify";
import { Dispatch } from "react";
import { UnknownAction } from "@reduxjs/toolkit";
import { setClientList } from "@/store/slices/clientSlice";
import { ClientDTO } from "@/types/fieldTypes";
import { errorToastHelper, successToastHelper } from "../helper/toast.helper";

interface createClientProps {
  payload: ClientDTO;
  setOpen: (e: boolean) => void;
  dispatch: Dispatch<UnknownAction>;
  clientList: ClientDTO[];
  setLoading: (e: boolean) => void;
}
interface updateClientProps {
  payload: ClientDTO;
  setIsEdit: (e: boolean) => void;
  setOpen: (e: boolean) => void;
  dispatch: Dispatch<UnknownAction>;
  clientList: ClientDTO[];
  setLoading: (e: boolean) => void;
}
interface getClientListProps {
  dispatch: Dispatch<UnknownAction>;
  setLoading: (e: boolean) => void;
}

interface DeleteClientProps {
  clientId: string;
  setLoading: (e: boolean) => void;
  clientList: ClientDTO[];
  dispatch: Dispatch<UnknownAction>;
}

const ClientService = () => {
  const CreateClient = ({
    payload,
    setOpen,
    clientList,
    dispatch,
    setLoading,
  }: createClientProps) => {
    setLoading(true);
    console.log(payload);
    axios(RequestHelper("POST", API_LIST.CREATE_CLIENT, { payload }))
      .then((response: any) => {
        const _data = response.data;
        const newlist = [...clientList, _data.data];
        dispatch(setClientList(newlist));
        console.log(_data);
        setOpen(false);
        setLoading(false);
        successToastHelper(_data?.response?.message);
      })
      .catch((error) => {
        const errorMessege = error?.response?.data?.error;
        toast(errorMessege ?? error.message, { type: "error" });
      });
  };

  const UpdateClient = ({
    payload,
    setIsEdit,
    setOpen,
    clientList,
    dispatch,
    setLoading,
  }: updateClientProps) => {
    setLoading(true);
    axios(
      RequestHelper("PUT", API_LIST.UPDATE_CLIENT + `${payload._id}`, {
        payload: payload,
      }),
    )
      .then((response: any) => {
        const _data = response.data;
        const _allClients = [...clientList];
        const updatedUser = _data.data;
        const index = _allClients.findIndex(
          (obj) => obj._id === updatedUser._id,
        );
        if (index !== -1) {
          _allClients.splice(index, 1, updatedUser);
          console.log(_allClients);
          dispatch(setClientList(_allClients));
        } else throw errorToastHelper("Cannot update the client.");
        console.log(_data);
        setOpen(false);
        setIsEdit(false);
        setLoading(false);
        successToastHelper(_data?.response?.message);
      })
      .catch((error) => {
        const errorMessege = error?.response?.data?.error;
        toast(errorMessege ?? error.message, { type: "error" });
      });
  };

  const GetClient = ({ dispatch, setLoading }: getClientListProps) => {
    setLoading(true);
    axios(RequestHelper("GET", API_LIST.GET_CLIENT))
      .then((response: any) => {
        const _data: any = response.data.data;
        console.log(_data);
        dispatch(setClientList(_data));
        setLoading(false);
      })
      .catch((error) => {
        const errorMessege = error?.response?.data?.error;
        console.log(errorMessege);
      });
  };

  const DeleteClient = ({
    clientId,
    setLoading,
    clientList,
    dispatch,
  }: DeleteClientProps) => {
    setLoading(true);
    axios(RequestHelper("DELETE", API_LIST.DELETE_CLIENT + `${clientId}`))
      .then((response: any) => {
        const _data = response.data;
        const _allClients = [...clientList];
        const index = _allClients.findIndex((obj) => obj._id === clientId);
        if (index !== -1) {
          _allClients.splice(index, 1);
          console.log(_allClients);
          dispatch(setClientList(_allClients));
        } else throw errorToastHelper("Cannot Delete the client.");
        setLoading(false);
        successToastHelper(_data?.response?.message);
      })
      .catch((error) => {
        const errorMessege = error?.response?.data?.error;
        errorToastHelper(errorMessege);
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
