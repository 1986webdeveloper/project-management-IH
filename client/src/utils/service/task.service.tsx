import { API_LIST } from "@/config/api.config";
import { TaskDTO } from "@/types/fieldTypes";
import { UnknownAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Dispatch } from "react";
import { RequestHelper } from "../helper/request.helper";
import { errorToastHelper, successToastHelper } from "../helper/toast.helper";
import { setTaskList } from "@/store/slices/taskSlice";

interface createTaskProps {
  payload: TaskDTO;
  setOpen: (e: boolean) => void;
}
interface updateTaskProps {
  payload: TaskDTO;
  setIsEdit: (e: boolean) => void;
  setOpen: (e: boolean) => void;
}

interface deleteTaskProps {
  taskId: string;
}

interface TaskServiceProps {
  setLoading: (e: boolean) => void;
  dispatch: Dispatch<UnknownAction>;
}

const TaskService = ({ setLoading, dispatch }: TaskServiceProps) => {
  const CreateTask = async ({ payload, setOpen }: createTaskProps) => {
    setLoading(true);
    await axios(RequestHelper("POST", API_LIST.CREATE_TASK, { payload }))
      .then((response: any) => {
        const _data = response.data;
        getTaskList();
        setOpen(false);
        setLoading(false);
        successToastHelper(_data?.response?.message);
      })
      .catch((error: any) => {
        const errorMessage = error?.response?.data?.response?.message;
        errorToastHelper(errorMessage, "CreateError");
        setLoading(false);
      });
  };
  const UpdateTask = async ({
    payload,
    setIsEdit,
    setOpen,
  }: updateTaskProps) => {
    setLoading(true);
    await axios(
      RequestHelper("PUT", API_LIST.UPDATE_TASK + `${payload._id}`, {
        payload: payload,
      }),
    )
      .then((response: any) => {
        const _data = response.data;
        getTaskList();
        setOpen(false);
        setIsEdit(false);
        setLoading(false);
        successToastHelper(_data?.response?.message);
      })
      .catch((error: any) => {
        const errorMessage = error?.response?.data?.response?.message;
        errorToastHelper(errorMessage, "updateToastError");
        setLoading(false);
      });
  };
  const getTaskList = async () => {
    setLoading(true);
    await axios(RequestHelper("GET", API_LIST.GET_TASK))
      .then((response: any) => {
        const _data: any = response.data.data;
        dispatch(setTaskList(_data));
        setLoading(false);
      })
      .catch((error: any) => {
        const errorMessage = error?.response?.data?.response?.message;
        // errorToastHelper(errorMessage, 'getTaskListError');
        setLoading(false);
      });
  };
  const deleteTask = async ({ taskId }: deleteTaskProps) => {
    setLoading(true);
    await axios(RequestHelper("DELETE", API_LIST.DELETE_TASK + `${taskId}`))
      .then((response: any) => {
        const _data = response.data;
        getTaskList();
        setLoading(false);
        successToastHelper(_data?.response?.message);
      })
      .catch((error: any) => {
        const errorMessage = error?.response?.data?.response?.message;
        errorToastHelper(errorMessage, "deleteTaskError");
        setLoading(false);
      });
  };

  return { CreateTask, UpdateTask, deleteTask, getTaskList };
};

export default TaskService;
