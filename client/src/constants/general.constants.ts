import { UserDTO } from "@/types/auth.types";
import { ClientDTO, ProjectDTO, TaskDTO } from "@/types/fieldTypes";

export const StatusList = [
  { label: "In-Progress", value: "IN_PROGRESS" },
  { label: "Complete", value: "COMPLETED" },
  { label: "Hold", value: "HOLD" },
];

export const PriorityList = [
  { label: "HIGH", value: "HIGH" },
  { label: "LOW", value: "LOW" },
  { label: "MEDIUM", value: "MEDIUM" },
];

export const technologyConstant = [
  { value: "nodeJs", label: "NodeJs" },
  { value: "reactJs", label: "ReactJs" },
];

export const PRIORITY_ENUM = {
  HIGH: "HIGH",
  LOW: "LOW",
  MEDIUM: "MEDIUM",
};

export const STATUS_ENUM = {
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  HOLD: "HOLD",
};

export const initProject: ProjectDTO = {
  projectName: "",
  startDate: "",
  estimatedHours: 0,
  status: "",
  deadlineDate: "",
  assignedEmployeeList: [],
  technologyList: [],
  priority: "",
  clientId: {} as ClientDTO,
  _id: "",
  reportingManager: {} as UserDTO,
};

export const initClient: ClientDTO = {
  clientName: "",
  onBoardingDate: "",
  industry: "",
  managerList: [],
  _id: "",
};

export const initTask: TaskDTO = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  reportedBy: [],
  reportingManager: {} as UserDTO,
  status: "",
  projectId: {} as ProjectDTO,
  priority: "",
  _id: "",
};
