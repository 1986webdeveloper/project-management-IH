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
  assignedEmployee: string;
  technologyList: string[];
  priority: string;
  clientId: string;
  profile: string;
  _id?: string;
}

export interface ClientDTO {
  clientName: string;
  onBoardingDate: string;
  industry: string;
  manager: string;
  _id: string;
}
