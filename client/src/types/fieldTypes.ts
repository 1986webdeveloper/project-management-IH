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
  client: string;
  profile: string;
}

//  "projectName": "Project management software",
//     "startDate": "2023-12-13",
//     "estimatedHours": 45,
//     "status": "IN_PROGRESS",
//     "deadlineDate": "2023-12-13",
//     "assignedEmployee": "Pranav joshi",
//     "technologyList": [
//         "nodejS",
//         "reactJs"
//     ],
//     "priority": "HIGH",
//     "clientId": "6571b5200b544c626e7d46a9",
//     "profile": "acquaint"
