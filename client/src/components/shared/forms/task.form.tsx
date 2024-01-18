import { ChangeEvent } from "react";
import AntInput from "@/components/elements/Input/Input.element";
import AntMultiSelect from "@/components/elements/multiSelect/multiSelect.element";
import AntDatePicker from "@/components/elements/datePicker/datePicker.element";
import { ProjectDTO, TaskDTO } from "@/types/fieldTypes";
import { UserDTO } from "@/types/auth.types";
import { useDispatch } from "react-redux";
import useList from "@/utils/helper/array.helper";
import { USER_ROLES } from "@/constants/user.constant";
import UserService from "@/utils/service/user.service";
import AntSelect from "@/components/elements/select/select.element";
import { PriorityList, StatusList } from "@/constants/general.constants";
import ProjectService from "@/utils/service/project.service";

interface ProjectProps {
  taskDetails: TaskDTO;
  setTaskDetails: (e: TaskDTO) => void;
  error: any;
  setError: (e: any) => void;
  fieldName: string;
  setFieldName: (e: string) => void;
  loading: boolean;
  isEdit: boolean;
  managerList: UserDTO[];
  projectList: ProjectDTO[];
  employeesList: UserDTO[];
  setLoading: (e: boolean) => void;
}

const TaskForm = ({
  taskDetails,
  setTaskDetails,
  error,
  setError,
  setFieldName,
  setLoading,
  isEdit,
  managerList,
  projectList,
  employeesList,
}: ProjectProps) => {
  const { ModuleList } = useList();
  const dispatch = useDispatch();
  const { GetUserList } = UserService({
    dispatch,
    setLoading,
  });
  const { GetProject } = ProjectService({ dispatch, setLoading });
  // *handle change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name, type } = e.target;
    setFieldName(name);
    setError({ ...error, [name]: "" });
    setTaskDetails({
      ...taskDetails,
      [name]: type === "number" ? Number(value) : value,
    });
  };
  const handleSelect = (e: string, id: string) => {
    setFieldName(id);
    setError({ ...error, [id]: "" });

    setTaskDetails({ ...taskDetails, [id]: e });
  };
  const handleMultiSelect = (e: any[], name: string) => {
    setFieldName(name);
    setError({ ...error, [name]: "" });

    setTaskDetails({ ...taskDetails, [name]: [...e] });
  };
  const handleDateSelect = (date: any, dateString: string, id: string) => {
    setTaskDetails({ ...taskDetails, [id]: dateString });
    setError({ ...error, [id]: "" });
  };

  return (
    <div>
      <div className="grid py-4 grid-rows-4 text-blue-950 grid-flow-col gap-2 items-start w-[100%]">
        <AntInput
          name={"title"}
          label="Title"
          placeHolder={"Enter Your task Name"}
          value={taskDetails.title}
          onChange={handleChange}
          onFocus={() => setFieldName("title")}
          error={error.title}
        />
        <AntSelect
          id="projectId"
          options={ModuleList(projectList, "projectName")}
          onFocus={() => {
            setFieldName("projectId");
            return GetProject();
          }}
          label={"Project name"}
          placeHolder={"Please select project"}
          onChange={(e) => handleSelect(e, "projectId")}
          value={
            isEdit
              ? taskDetails?.projectId?.projectName
              : taskDetails?.projectId
          }
          error={error.projectId}
        />
        <AntInput
          name={"description"}
          label="Description"
          placeHolder={"Enter Your Customer Name"}
          value={taskDetails.description}
          onChange={handleChange}
          onFocus={() => setFieldName("description")}
          error={error.description}
        />
        <div className="flex gap-4">
          <AntDatePicker
            name={"startDate"}
            value={
              taskDetails?.startDate?.length > 0 ? taskDetails.startDate : ""
            }
            label="Start Date"
            onChange={(date, dateString) =>
              handleDateSelect(date, dateString, "startDate")
            }
            applyAgeValidation={false}
            onFocus={() => setFieldName("startDate")}
            error={error.startDate}
          />
          <AntDatePicker
            name={"endDate"}
            value={taskDetails?.endDate?.length > 0 ? taskDetails.endDate : ""}
            label="Deadline date"
            onChange={(date, dateString) =>
              handleDateSelect(date, dateString, "endDate")
            }
            applyAgeValidation={false}
            onFocus={() => setFieldName("endDate")}
            error={error.endDate}
          />
        </div>
        <AntSelect
          id="reportingManager"
          options={ModuleList(managerList, "name")}
          onFocus={() => {
            setFieldName("reportingManager");
            return GetUserList({ role: USER_ROLES.MANAGER });
          }}
          label="Reporting manager"
          placeHolder={"Enter reporting manager"}
          onChange={(e) => handleSelect(e, "reportingManager")}
          value={
            isEdit
              ? taskDetails.reportingManager.name
              : taskDetails.reportingManager
          }
          error={error.reportingManager}
        />
        <AntMultiSelect
          width={330}
          value={
            isEdit
              ? ModuleList(taskDetails.reportedBy, "name")
              : taskDetails.reportedBy
          }
          label="Reported By"
          placeHolder="Select rapporteur"
          options={ModuleList(employeesList, "name")}
          onChange={(e) => {
            handleMultiSelect(e, "reportedBy");
          }}
          onFocus={() => {
            setFieldName("reportedBy");
            return GetUserList({ role: USER_ROLES.EMPLOYEE });
          }}
          optionLabel={"label"}
          error={error.reportedBy}
        />
        <AntSelect
          id="status"
          options={StatusList}
          label={"Status"}
          placeHolder={"Select"}
          onChange={(e) => handleSelect(e, "status")}
          value={taskDetails.status}
          onFocus={() => setFieldName("status")}
          error={error.status}
        />
        <AntSelect
          id="priority"
          options={PriorityList}
          label={"Priority"}
          placeHolder={"Select"}
          onChange={(e) => handleSelect(e, "priority")}
          value={taskDetails.priority}
          onFocus={() => setFieldName("priority")}
          error={error.priority}
        />
      </div>
    </div>
  );
};

export default TaskForm;
