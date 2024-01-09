import { UserDTO } from "./auth.types";

export interface fieldTypes {
  labelText: string;
  labelFor: string;
  id: string;
  name: string;
  type: string;
  autoComplete: string;
  isRequired: boolean;
  placeholder: string;
  pattern: RegExp;
}

export interface ProjectDTO {
  projectName: string;
  startDate: string;
  estimatedHours: number;
  status: string;
  deadlineDate: string;
  assignedEmployeeList: UserDTO[];
  reportingManager: UserDTO;
  technologyList: string[];
  priority: string;
  clientId: ClientDTO;
  _id?: string;
}

export interface ClientDTO {
  clientName: string;
  onBoardingDate: string;
  industry: string;
  managerList: UserDTO[];
  _id: string;
}

export interface TaskDTO {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  reportedBy: UserDTO[];
  reportingManager: UserDTO;
  status: string;
  projectId: ProjectDTO;
  priority: string;
  _id: string;
}
