export const UserRole = [
	{ label: 'Admin', value: 'ADMIN' },
	{ label: 'HR', value: 'HR' },
	{ label: 'Employee', value: 'EMPLOYEE' },
	{ label: 'Manager', value: 'MANAGER' },
];

export const DepartmentsList = [
	{ label: 'Administration', value: 'ADMINISTRATION', permission: ['ADMIN'] },
	{ label: 'Web', value: 'WEB', permission: ['EMPLOYEE'] },
	{ label: 'Mobile', value: 'MOBILE', permission: ['EMPLOYEE'] },
	{ label: 'Business Development', value: 'BUSINESS_DEVELOPMENT', permission: ['EMPLOYEE'] },
	{ label: 'Non-Technical', value: 'NON_TECHNICAL', permission: ['HR'] },
	{ label: 'Management', value: 'MANAGEMENT', permission: ['MANAGER'] },
];

export const DesignationList = [
	{ label: 'Web Developer', value: 'WEB_DEVELOPER', permission: ['WEB'] },
	{
		label: 'Business Development Executive',
		value: 'BUSINESS_DEVELOPMENT_EXECUTIVE',
		permission: ['BUSINESS_DEVELOPMENT'],
	},
	{ label: 'Mobile developer', value: 'MOBILE_DEVELOPER', permission: ['MOBILE'] },
	{ label: 'Human Resource Executive', value: 'HUMAN_RESOURCE_EXECUTIVE', permission: ['NON_TECHNICAL'] },
	{ label: 'Admin staff', value: 'ADMIN_STAFF', permission: ['ADMINISTRATION'] },
	{ label: 'Project Manager', value: 'PROJECT_MANAGER', permission: ['MANAGEMENT'] },
];

export const userStatusList = [
	{ label: 'Active', value: 'ACTIVE' },
	{ label: 'In-Active', value: 'INACTIVE' },
	{ label: 'Blocked', value: 'BLOCKED' },
];

export const USER_ROLES = {
	ADMIN: 'ADMIN',
	HR: 'HR',
	EMPLOYEE: 'EMPLOYEE',
	MANAGER: 'MANAGER',
};

export const USER_STATUS_ENUM = {
	ACTIVE: 'ACTIVE',
	INACTIVE: 'INACTIVE',
	BLOCKED: 'BLOCKED',
};
