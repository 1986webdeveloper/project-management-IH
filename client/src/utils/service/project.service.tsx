/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { API_LIST } from "../../config/api.config";
import { RequestHelper } from "../helper/request.helper";
import { Dispatch } from "react";
import { UnknownAction } from "@reduxjs/toolkit";
import { setProjectList } from "@/store/slices/projectSlice";
import { errorToastHelper, successToastHelper } from "../helper/toast.helper";

interface ProjectServiceProps {
  setLoading: (e: boolean) => void;
  dispatch: Dispatch<UnknownAction>;
}

interface createProjectProps {
  payload: any;
  setOpen: (e: boolean) => void;
}
interface updateProjectProps {
  payload: any;
  setIsEdit: (e: boolean) => void;
  setOpen: (e: boolean) => void;
}

interface DeleteProjectProps {
  projectId: string;
}

const ProjectService = ({ dispatch, setLoading }: ProjectServiceProps) => {
  const CreateProject = async ({ payload, setOpen }: createProjectProps) => {
    setLoading(true);
    await axios(
      RequestHelper("POST", API_LIST.CREATE_PROJECT, { payload: payload }),
    )
      .then(async (response: any) => {
        const _data = response.data;
        await GetProject();
        setOpen(false);
        setLoading(false);
        successToastHelper(_data?.response?.message);
      })
      .catch((error: any) => {
        const errorMessage = error?.response?.data?.response?.message;
        errorToastHelper(errorMessage, "CreateProjectError");
        setLoading(false);
      });
  };

  const UpdateProject = async ({
    payload,
    setOpen,
    setIsEdit,
  }: updateProjectProps) => {
    setLoading(true);
    await axios(
      RequestHelper("PUT", API_LIST.UPDATE_PROJECT + `${payload._id}`, {
        payload: payload,
      }),
    )
      .then(async (response: any) => {
        const _data = response.data;
        await GetProject();
        setOpen(false);
        setIsEdit(false);
        setLoading(false);
        successToastHelper(_data?.response?.message);
      })
      .catch((error: any) => {
        const errorMessage = error?.response?.data?.response?.message;
        errorToastHelper(errorMessage, "updateProjectError");
        setLoading(false);
      });
  };

  const GetProject = async () => {
    setLoading(true);
    await axios(RequestHelper("GET", API_LIST.GET_PROJECT))
      .then((response: any) => {
        const _data: any = response.data.data;
        dispatch(setProjectList(_data));
        setLoading(false);
      })
      .catch((error: any) => {
        const errorMessage = error?.response?.data?.response?.message;
        console.log(errorMessage);
        errorToastHelper(errorMessage);
        setLoading(false);
      });
  };

  const DeleteProject = async ({ projectId }: DeleteProjectProps) => {
    setLoading(true);
    await axios(
      RequestHelper("DELETE", API_LIST.DELETE_PROJECT + `${projectId}`),
    )
      .then(async (response: any) => {
        const _data = response.data;
        await GetProject();
        setLoading(false);
        successToastHelper(_data?.response?.message);
      })
      .catch((error: any) => {
        const errorMessage = error?.response?.data?.response?.message;
        errorToastHelper(errorMessage, "DeleteProjectError");
        setLoading(false);
      });
  };
  return {
    CreateProject,
    UpdateProject,
    GetProject,
    DeleteProject,
  };
};

export default ProjectService;
