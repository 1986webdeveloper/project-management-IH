import { DepartmentsList, DesignationList } from "@/constants/user.constant";

export const departmentHelper = (matchKey: string) => {
  const filteredDepartments = DepartmentsList.filter((opt: any) => {
    return opt?.permission?.includes(matchKey);
  });
  return filteredDepartments;
};

export const designationHelper = (matchKey: string) => {
  const filteredDesignation = DesignationList.filter((opt: any) => {
    return opt?.permission?.includes(matchKey);
  });

  return filteredDesignation;
};
