import { DepartmentsList, DesignationList } from '@/constants/user.constant';

export const departmentHelper = (matchKey: string) => {
	const filteredDepartments = DepartmentsList.filter((route: any) => {
		return route?.permission?.includes(matchKey);
	});
	return filteredDepartments;
};

export const designationHelper = (matchKey: string) => {
	const filteredDesignation = DesignationList.filter((route: any) => {
		return route?.permission?.includes(matchKey);
	});

	return filteredDesignation;
};
