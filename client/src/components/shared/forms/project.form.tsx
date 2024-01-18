import { ChangeEvent } from "react";
import AntInput from "@/components/elements/Input/Input.element";
import AntMultiSelect from "@/components/elements/multiSelect/multiSelect.element";
import AntDatePicker from "@/components/elements/datePicker/datePicker.element";
import { ClientDTO, ProjectDTO } from "@/types/fieldTypes";
import { UserDTO } from "@/types/auth.types";
import { useDispatch } from "react-redux";
import useList from "@/utils/helper/array.helper";
import { USER_ROLES } from "@/constants/user.constant";
import UserService from "@/utils/service/user.service";
import { Dayjs } from "dayjs";
import AntSelect from "@/components/elements/select/select.element";
import ClientService from "@/utils/service/client.service";
import {
  PriorityList,
  StatusList,
  technologyConstant,
} from "@/constants/general.constants";

interface ProjectProps {
  projectDetails: ProjectDTO;
  setProjectDetails: (e: ProjectDTO) => void;
  error: any;
  setError: (e: any) => void;
  fieldName: string;
  setFieldName: (e: string) => void;
  loading: boolean;
  isEdit: boolean;
  managerList: UserDTO[];
  clientList: ClientDTO[];
  employeeList: UserDTO[];
  setLoading: (e: boolean) => void;
}

const ProjectForm = ({
  projectDetails,
  setProjectDetails,
  error,
  setError,
  setFieldName,
  setLoading,
  isEdit,
  managerList,
  clientList,
  employeeList,
}: ProjectProps) => {
  const { ModuleList } = useList();
  const dispatch = useDispatch();
  const { GetUserList } = UserService({
    dispatch,
    setLoading,
  });
  const { GetClient } = ClientService({ dispatch, setLoading });
  // *handle change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFieldName(name);
    setError({ ...error, [name]: "" });
    setProjectDetails({ ...projectDetails, [name]: value });
  };
  const handleMultiSelect = (e: any, name: string) => {
    setFieldName(name);
    setError({ ...error, [name]: "" });
    setProjectDetails({ ...projectDetails, [name]: [...e] });
  };
  const handleDateSelect = (
    date: Dayjs | null,
    dateString: string,
    id: string,
  ) => {
    setFieldName(id);
    setError({ ...error, [id]: "" });
    setProjectDetails({ ...projectDetails, [id]: dateString });
  };
  const handleSelect = (e: string, id: string) => {
    setFieldName(id);
    setError({ ...error, [id]: "" });
    setProjectDetails({ ...projectDetails, [id]: e });
  };
  return (
    <div>
      <div className="grid py-7 grid-rows-5 text-blue-950 grid-flow-col  items-start w-[100%]">
        <AntInput
          name={"projectName"}
          label="Project Name"
          placeHolder={"Enter Your Project Name"}
          value={projectDetails.projectName}
          onChange={handleChange}
          onFocus={() => setFieldName("projectName")}
          error={error.projectName}
        />
        <AntSelect
          id="clientId"
          options={ModuleList(clientList, "clientName")}
          onFocus={() => {
            setFieldName("clientName");
            return GetClient();
          }}
          label={"Client"}
          placeHolder={"Client"}
          onChange={(e) => handleSelect(e, "clientId")}
          value={
            isEdit
              ? projectDetails?.clientId?.clientName
              : projectDetails?.clientId
          }
          error={error.clientId}
        />
        <AntSelect
          id="reportingManager"
          options={ModuleList(managerList, "name")}
          label={"Reporting manager"}
          placeHolder={"Select Manager"}
          onChange={(e) => handleSelect(e, "reportingManager")}
          // value={projectDetails.reportingManager.name}
          value={
            isEdit
              ? projectDetails?.reportingManager?.name
              : projectDetails?.reportingManager
          }
          onFocus={() => {
            setFieldName("reportingManager");
            return GetUserList({ role: USER_ROLES.MANAGER });
          }}
          error={error.reportingManager}
        />
        <div className="flex gap-4">
          <AntDatePicker
            name={"startDate"}
            value={
              projectDetails?.startDate?.length > 0
                ? projectDetails.startDate
                : ""
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
            name={"deadlineDate"}
            value={
              projectDetails?.deadlineDate?.length > 0
                ? projectDetails?.deadlineDate
                : ""
            }
            label="Deadline date"
            onChange={(date, dateString) =>
              handleDateSelect(date, dateString, "deadlineDate")
            }
            applyAgeValidation={false}
            onFocus={() => setFieldName("deadlineDate")}
            error={error.deadlineDate}
          />
        </div>
        <AntMultiSelect
          width={330}
          value={
            isEdit
              ? ModuleList(projectDetails?.assignedEmployeeList, "name")
              : projectDetails?.assignedEmployeeList
          }
          label="Assigned Employees"
          placeHolder="Select Employees"
          options={ModuleList(employeeList, "name")}
          onChange={(e) => {
            handleMultiSelect(e, "assignedEmployeeList");
          }}
          onFocus={() => {
            setFieldName("assignedEmployeeList");
            return GetUserList({ role: USER_ROLES.EMPLOYEE });
          }}
          optionLabel={"label"}
          error={error.assignedEmployeeList}
        />
        <AntInput
          name={"estimatedHours"}
          label="Estimated Hours"
          placeHolder={"Enter Estimated Hours"}
          value={projectDetails.estimatedHours.toString()}
          onChange={handleChange}
          type="number"
          onFocus={() => setFieldName("estimatedHours")}
          error={error.estimatedHours}
        />
        <AntSelect
          id="status"
          options={StatusList}
          label={"Status"}
          placeHolder={"Select"}
          onChange={(e) => handleSelect(e, "status")}
          value={projectDetails.status}
          onFocus={() => setFieldName("status")}
          error={error.status}
        />
        <AntMultiSelect
          id="technologyList"
          width={330}
          value={projectDetails.technologyList}
          label="Technologies used"
          placeHolder="Select Technology"
          options={technologyConstant}
          onChange={(e) => {
            handleMultiSelect(e, "technologyList");
          }}
          optionLabel={"label"}
          onFocus={() => setFieldName("technologyList")}
          error={error.technologyList}
        />
        <AntSelect
          id={"priority"}
          options={PriorityList}
          label={"Priority"}
          placeHolder={"Select"}
          onChange={(e) => handleSelect(e, "priority")}
          value={projectDetails.priority}
          onFocus={() => setFieldName("priority")}
          error={error.priority}
        />
      </div>
    </div>
  );
};

export default ProjectForm;
