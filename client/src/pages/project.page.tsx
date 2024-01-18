/* eslint-disable @typescript-eslint/no-explicit-any */
import AntCard from "@/components/elements/card/card.element";
import { useState } from "react";
import { ClientDTO, ProjectDTO } from "@/types/fieldTypes";
import ProjectService from "@/utils/service/project.service";
import { errorToastHelper } from "@/utils/helper/toast.helper";
import { initProject } from "@/constants/general.constants";

import CreateButton from "@/components/elements/buttons/createButton.element";
import { projectInputValidation } from "@/utils/helper/validation.helper";
import { UserDTO } from "@/types/auth.types";
import ProjectTable from "@/components/shared/tables/project.table";
import FormModal from "@/components/shared/modals/form.modal";
import ProjectForm from "@/components/shared/forms/project.form";
import { useDispatch } from "react-redux";

interface ProjectProps {
  projectList: ProjectDTO[];
  clientList: ClientDTO[];
  managerList: UserDTO[];
  employeeList: UserDTO[];
}

const Project = ({
  projectList,
  clientList,
  employeeList,
  managerList,
}: ProjectProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [projectDetails, setProjectDetails] = useState(initProject);
  const [error, setError] = useState({
    projectName: "",
    estimatedHours: "",
    startDate: "",
    deadlineDate: "",
    clientId: "",
    reportingManager: "",
    status: "",
    priority: "",
    assignedEmployeeList: "",
    technologyList: "",
  });

  const dispatch = useDispatch();
  const { CreateProject, UpdateProject, DeleteProject } = ProjectService({
    dispatch,
    setLoading,
  });
  const [isEdit, setEdit] = useState(false);

  //   useEffect(() => {
  //     const { errors } = projectInputValidation(projectDetails, setError);
  //     setError({ ...error, [fieldName]: errors[fieldName] });
  //   }, [projectDetails, fieldName]);

  // *modal actions
  const handleCancel = () => {
    setError({} as any);
    setFieldName("");
    setProjectDetails(initProject);
    setOpen(false);
    setEdit(false);
  };
  const showModal = () => {
    setProjectDetails(initProject);
    setOpen(true);
  };
  // *FormActions
  const onSubmit = (e: any) => {
    e.preventDefault();
    const { errors } = projectInputValidation(projectDetails, setError, isEdit);
    if (!Object.values(errors).some((value) => value)) {
      if (!isEdit) {
        CreateProject({
          payload: {
            ...projectDetails,
            estimatedHours: parseInt(projectDetails.estimatedHours.toString()),
          },
          setOpen: setOpen,
        });
        setError({} as any);
      }
      if (isEdit) {
        UpdateProject({
          payload: projectDetails,
          setIsEdit: setEdit,
          setOpen: setOpen,
        });
        setError({} as any);
      }
    } else {
      errorToastHelper("Please fill the details properly.");
    }
  };
  const onEdit = (data: ProjectDTO) => {
    setProjectDetails(data);
    setOpen(true);
    setEdit(true);
  };
  const onDelete = (data: ProjectDTO) => {
    if (!data._id) return errorToastHelper("Project ID not found!!S");
    DeleteProject({ projectId: data?._id ?? "" });
  };

  return (
    <div className="flex flex-col justify-center gap-4 p-4">
      <AntCard
        cardTitle={
          <div className="flex w-full items-center justify-between p-4">
            <span className="text-xl">Project Summary</span>
            <CreateButton onCreate={showModal} />
          </div>
        }
      >
        <ProjectTable
          onEdit={onEdit}
          onDelete={onDelete}
          loading={loading}
          projectList={projectList}
        />
      </AntCard>
      <FormModal
        open={open}
        onSubmit={onSubmit}
        handleCancel={handleCancel}
        loading={loading}
        error={error}
        checkObject={projectDetails}
        title={isEdit ? "Edit Project" : "Create Project"}
        SubmitButtonText={isEdit ? "Update" : "Save"}
      >
        <ProjectForm
          projectDetails={projectDetails}
          setProjectDetails={setProjectDetails}
          error={error}
          setError={setError}
          setFieldName={setFieldName}
          loading={loading}
          fieldName={fieldName}
          isEdit={isEdit}
          managerList={managerList}
          clientList={clientList}
          employeeList={employeeList}
          setLoading={setLoading}
        />
      </FormModal>
      {/* <Modal
        open={open}
        title={
          <span className="mb-10 text-blue-950">
            {isEdit ? "Edit Project" : "Create Project"}
          </span>
        }
        onOk={onSubmit}
        width={800}
        onCancel={handleCancel}
        okButtonProps={{ className: "bg-blue-950", loading: loading }}
        okText={isEdit ? "Update" : "Save"}
        cancelButtonProps={{ danger: true, type: "primary" }}
      ></Modal> */}
    </div>
  );
};

export default Project;
