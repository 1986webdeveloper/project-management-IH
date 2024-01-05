export const ROUTES = {
	HOME: '/',
	LOGIN: '/login',
	REGISTER: 'register',
	FORGOT_PASSWORD: '/forgot-pass',
	RESET_PASSWORD: 'resetpassword',
	PROJECT: 'project',
	CLIENT: 'client',
	TASK: 'task',
	USER: 'user',
};

export const RouteMenu = [
	{
		key: 1,
		route: ROUTES.HOME,
		label: 'Home',
		permission: ['ADMIN', 'MANAGER', 'EMPLOYEE'],
		// icon: FaHome,
	},
	{
		key: 2,
		route: ROUTES.USER,
		label: 'User',
		permission: ['ADMIN'],
		icon: '',
	},
	{
		key: 3,
		route: ROUTES.CLIENT,
		label: 'Client',
		permission: ['ADMIN'],
		icon: '',
	},
	{
		key: 4,
		route: ROUTES.PROJECT,
		label: 'Project',
		permission: ['ADMIN', 'MANAGER'],
		icon: '',
	},
	{
		key: 5,
		route: ROUTES.TASK,
		label: 'Task',
		permission: ['ADMIN', 'MANAGER', 'EMPLOYEE'],
		icon: '',
	},
];

export interface RouteType {
	key: number;
	route: string;
	label: string;
	permission: string[];
	icon: string;
	heading: string;
}

export const AntRoute: RouteType[] = [
	{
		key: 1,
		route: ROUTES.HOME,
		label: 'Home',
		permission: ['ADMIN', 'MANAGER', 'EMPLOYEE'],
		icon: 'FaHome',
		heading: 'Dashboard',
	},
	{
		key: 2,
		route: ROUTES.USER,
		label: 'User',
		permission: ['ADMIN'],
		icon: 'FaUserFriends',
		heading: 'User Management',
	},
	{
		key: 3,
		route: ROUTES.CLIENT,
		label: 'Client',
		permission: ['ADMIN'],
		icon: 'FaHandsHelping',
		heading: 'Client Management',
	},
	{
		key: 4,
		route: ROUTES.PROJECT,
		label: 'Project',
		permission: ['ADMIN', 'MANAGER'],
		icon: 'FaChartBar',
		heading: 'Project Management',
	},
	{
		key: 5,
		route: ROUTES.TASK,
		label: 'Task',
		permission: ['ADMIN', 'MANAGER', 'EMPLOYEE'],
		icon: 'FaTasks',
		heading: 'Task Management',
	},
];
