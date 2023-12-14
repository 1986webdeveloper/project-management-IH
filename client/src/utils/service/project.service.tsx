/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { API_LIST } from "../../config/api.config";
import { RequestHelper } from "../helper/request.helper";
import { Dispatch } from "react";
import { UnknownAction } from "@reduxjs/toolkit";
import { setProjectList } from "@/store/slices/projectSlice";
import { errorToastHelper, successToastHelper } from "../helper/toast.helper";
import { ProjectDTO } from "@/types/fieldTypes";

interface createProjectProps {
  payload: any;
  setOpen: (e: boolean) => void;
  dispatch: Dispatch<UnknownAction>;
  projectList: ProjectDTO[];
  setLoading: (e: boolean) => void;
}
interface updateProjectProps {
  payload: any;
  setIsEdit: (e: boolean) => void;
  setOpen: (e: boolean) => void;
  projectList: ProjectDTO[];
  dispatch: Dispatch<UnknownAction>;
  setLoading: (e: boolean) => void;
}
interface getProjectListProps {
  dispatch: Dispatch<UnknownAction>;
  setLoading: (e: boolean) => void;
}

interface DeleteProjectProps {
  projectId: string;
  setLoading: (e: boolean) => void;
  projectList: ProjectDTO[];
  dispatch: Dispatch<UnknownAction>;
}

const ProjectService = () => {
  const CreateProject = ({
    payload,
    setOpen,
    dispatch,
    projectList,
    setLoading,
  }: createProjectProps) => {
    setLoading(true);
    axios(RequestHelper("POST", API_LIST.CREATE_PROJECT, { payload: payload }))
      .then((response: any) => {
        const _data = response.data;
        const newlist = [...projectList, _data.data];
        dispatch(setProjectList(newlist));
        setOpen(false);
        setLoading(false);
        successToastHelper(_data?.response?.message);
      })
      .catch((error) => {
        const errorMessege = error?.response?.data?.error;
        errorToastHelper(errorMessege);
      });
  };

  const UpdateProject = ({
    payload,
    setOpen,
    setIsEdit,
    projectList,
    dispatch,
    setLoading,
  }: updateProjectProps) => {
    setLoading(true);
    axios(
      RequestHelper("PUT", API_LIST.UPDATE_PROJECT + `${payload._id}`, {
        payload: payload,
      }),
    )
      .then((response: any) => {
        const _data = response.data;
        let allProjects = [...projectList];
        const updatedUser = _data.data;
        const index = allProjects.findIndex(
          (obj) => obj._id === updatedUser._id,
        );
        if (index !== -1) {
          allProjects.splice(index, 1, updatedUser);
          console.log(allProjects);
          dispatch(setProjectList(allProjects));
        } else throw errorToastHelper("Cannot update the project.");
        setOpen(false);
        setIsEdit(false);
        setLoading(false);
        successToastHelper(_data?.response?.message);
      })
      .catch((error) => {
        const errorMessege = error?.response?.data?.error;
        errorToastHelper(errorMessege);
      });
  };

  const GetProject = ({ dispatch, setLoading }: getProjectListProps) => {
    setLoading(true);
    axios(RequestHelper("GET", API_LIST.GET_PROJECT))
      .then((response: any) => {
        const _data: any = response.data.data;
        dispatch(setProjectList(_data));
        setLoading(false);
      })
      .catch((error) => {
        const errorMessege = error?.response?.data?.error;
        console.log(errorMessege);
      });
  };

  const DeleteProject = ({
    projectId,
    setLoading,
    dispatch,
    projectList,
  }: DeleteProjectProps) => {
    setLoading(true);
    axios(RequestHelper("DELETE", API_LIST.DELETE_PROJECT + `${projectId}`))
      .then((response: any) => {
        const _data = response.data;
        let allProjects = [...projectList];

        const index = allProjects.findIndex((obj) => obj._id === projectId);
        if (index !== -1) {
          allProjects.splice(index, 1);
          console.log(allProjects);
          dispatch(setProjectList(allProjects));
        } else throw errorToastHelper("Cannot delete the project.");
        console.log(_data);
        setLoading(false);
        successToastHelper(_data?.response?.message);
      })
      .catch((error) => {
        const errorMessege = error?.response?.data?.error;
        errorToastHelper(errorMessege);
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
