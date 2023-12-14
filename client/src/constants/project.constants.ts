import { ProjectDTO } from "@/types/fieldTypes";

export const ProjectStatus = [
  { label: "In-Progress", value: "IN_PROGRESS" },
  { label: "Complete", value: "COMPLETE" },
  { label: "Hold", value: "HOLD" },
];

export const ProjectPriority = [
  { label: "HIGH", value: "HIGH" },
  { label: "LOW", value: "LOW" },
  { label: "MEDIUM", value: "MEDIUM" },
];

export const technologyConstant = [
  { value: "nodeJs", label: "NodeJs" },
  { value: "reactJs", label: "ReactJs" },
];

export const initProject: ProjectDTO = {
  projectName: "",
  startDate: "",
  estimatedHours: 0,
  status: "",
  deadlineDate: "",
  assignedEmployee: "",
  technologyList: [],
  priority: "",
  clientId: "6571b5200b544c626e7d46a9",
  profile: "",
  _id: "",
};
