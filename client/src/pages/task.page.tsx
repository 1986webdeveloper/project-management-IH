import { useEffect, useState } from "react";
import AntCard from "@/components/elements/card/card.element";
import { ProjectDTO, TaskDTO } from "@/types/fieldTypes";
import { initTask } from "@/constants/general.constants";
import TaskService from "@/utils/service/task.service";
import { useDispatch } from "react-redux";
import { errorToastHelper } from "@/utils/helper/toast.helper";
import CreateButton from "@/components/elements/buttons/createButton.element";
import { taskInputValidation } from "@/utils/helper/validation.helper";
import { UserDTO } from "@/types/auth.types";
import TaskTable from "@/components/shared/tables/task.table";
import TaskForm from "../components/shared/forms/task.form";
import FormModal from "@/components/shared/modals/form.modal";

interface TaskProps {
  taskList: TaskDTO[];
  projectList: ProjectDTO[];
  employeesList: UserDTO[];
  managerList: UserDTO[];
}

const Task = ({
  taskList,
  projectList,
  employeesList,
  managerList,
}: TaskProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [taskDetails, setTaskDetails] = useState(initTask);
  const [isEdit, setEdit] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [error, setError] = useState({
    title: "",
    projectId: "",
    description: "",
    startDate: "",
    endDate: "",
    reportingManager: "",
    reportedBy: "",
    status: "",
    priority: "",
  });
  const dispatch = useDispatch();

  const { CreateTask, UpdateTask, deleteTask } = TaskService({
    dispatch,
    setLoading,
  });

  // useEffect(() => {
  //   const { errors } = taskInputValidation(taskDetails, setError);
  //   setError({ ...error, [fieldName]: errors[fieldName] });
  // }, [taskDetails, fieldName]);

  // *modal actions
  const showModal = () => {
    setTaskDetails(initTask);
    setOpen(true);
  };
  const handleCancel = () => {
    setError({} as any);
    setFieldName("");
    setTaskDetails(initTask);
    setOpen(false);
    setEdit(false);
  };
  // *FormActions
  const onSubmit = (e: any) => {
    e.preventDefault();
    const { errors } = taskInputValidation(taskDetails, setError, isEdit);
    if (!Object.values(errors).some((value) => value)) {
      if (!isEdit) {
        CreateTask({
          payload: taskDetails,
          setOpen: setOpen,
        });
        setError({} as any);
      }
      if (isEdit) {
        UpdateTask({
          payload: taskDetails,
          setIsEdit: setEdit,
          setOpen: setOpen,
        });
        setError({} as any);
      }
    } else {
      errorToastHelper("Please fill the details properly.");
    }
  };
  const onEdit = (data: TaskDTO) => {
    setTaskDetails(data);
    setOpen(true);
    setEdit(true);
  };
  const onDelete = (data: TaskDTO) => {
    if (!data._id) return errorToastHelper("Task ID not found!!");
    deleteTask({
      taskId: data?._id ?? "",
    });
  };

  return (
    <div className="flex flex-col justify-center gap-4 p-4">
      <AntCard
        cardTitle={
          <div className="flex w-full items-center justify-between p-4">
            <span className="text-xl">Task Summary</span>
            <CreateButton onCreate={showModal} />
          </div>
        }
      >
        <TaskTable
          onEdit={onEdit}
          onDelete={onDelete}
          loading={loading}
          taskList={taskList}
        />
      </AntCard>
      <FormModal
        open={open}
        onSubmit={onSubmit}
        handleCancel={handleCancel}
        loading={loading}
        error={error}
        checkObject={taskDetails}
        title={isEdit ? "Edit Task" : "Create Task"}
        SubmitButtonText={isEdit ? "Update" : "Save"}
      >
        <TaskForm
          taskDetails={taskDetails}
          setTaskDetails={setTaskDetails}
          error={error}
          setError={setError}
          fieldName={fieldName}
          setFieldName={setFieldName}
          loading={loading}
          isEdit={isEdit}
          managerList={managerList}
          projectList={projectList}
          employeesList={employeesList}
          setLoading={setLoading}
        />
      </FormModal>
    </div>
  );
};

export default Task;
