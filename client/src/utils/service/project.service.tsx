/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { API_LIST } from "../../config/api.config";
import { RequestHelper } from "../helper/request.helper";
import { ROUTES } from "@/constants/routes.constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Dispatch } from "react";
import { UnknownAction } from "@reduxjs/toolkit";
import { setProjectList } from "@/store/slices/projectSlice";

interface createProjectProps {
  payload: any;
}
interface updateProjectProps {
  payload: any;
  projectId: string;
}
interface getProjectListProps {
  dispatch: Dispatch<UnknownAction>;
}

const ProjectService = () => {
  const navigate = useNavigate();
  const CreateProject = ({ payload }: createProjectProps) => {
    const _payload = {
      ...payload,
      clientId: "6571b5200b544c626e7d46a9",
    };
    axios(RequestHelper("POST", API_LIST.CREATEPROJECT, { payload: _payload }))
      .then((response: any) => {
        const _data = response.data;
        console.log(_data);
        navigate(ROUTES.PROJECT);
      })
      .catch((error) => {
        const errorMessege = error?.response?.data?.error;
        toast(errorMessege ?? error.message, { type: "error" });
      });
  };

  const UpdateProject = ({ payload, projectId }: updateProjectProps) => {
    const _payload = {
      ...payload,
      clientId: "6571b5200b544c626e7d46a9",
    };

    axios(
      RequestHelper("PUT", API_LIST.UPDATEPROJECT + `${projectId}`, {
        payload: _payload,
      }),
    )
      .then((response: any) => {
        const _data = response.data;
        console.log(_data);
        navigate(ROUTES.PROJECT);
      })
      .catch((error) => {
        const errorMessege = error?.response?.data?.error;
        toast(errorMessege ?? error.message, { type: "error" });
      });
  };

  const GetProject = ({ dispatch }: getProjectListProps) => {
    axios(RequestHelper("GET", API_LIST.GETPROJECT))
      .then((response: any) => {
        const _data: any = response.data.data;
        console.log(_data, "-----");
        dispatch(setProjectList(_data));
        navigate(ROUTES.PROJECT);
      })
      .catch((error) => {
        const errorMessege = error?.response?.data?.error;
        toast(errorMessege ?? error.message, { type: "error" });
      });
  };

  return {
    CreateProject,
    UpdateProject,
    GetProject,
  };
};

export default ProjectService;
