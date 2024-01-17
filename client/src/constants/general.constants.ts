import { UserDTO } from '@/types/auth.types';
import { ClientDTO, ProjectDTO, TaskDTO } from '@/types/fieldTypes';
import dayjs from 'dayjs';

export const StatusList = [
	{ label: 'In-Progress', value: 'IN_PROGRESS' },
	{ label: 'Complete', value: 'COMPLETED' },
	{ label: 'Hold', value: 'HOLD' },
];

export const PriorityList = [
	{ label: 'HIGH', value: 'HIGH' },
	{ label: 'LOW', value: 'LOW' },
	{ label: 'MEDIUM', value: 'MEDIUM' },
];

export const technologyConstant = [
	{ value: 'nodeJs', label: 'NodeJs' },
	{ value: 'reactJs', label: 'ReactJs' },
];

export const PRIORITY_ENUM = {
	HIGH: 'HIGH',
	LOW: 'LOW',
	MEDIUM: 'MEDIUM',
};

export const STATUS_ENUM = {
	IN_PROGRESS: 'IN_PROGRESS',
	COMPLETED: 'COMPLETED',
	HOLD: 'HOLD',
};

export const initProject: ProjectDTO = {
	projectName: '',
	startDate: '',
	estimatedHours: 0,
	status: '',
	deadlineDate: '',
	assignedEmployeeList: [],
	technologyList: [],
	priority: '',
	clientId: '',
	_id: '',
	reportingManager: '',
};

export const initClient: ClientDTO = {
	clientName: '',
	onBoardingDate: '',
	industry: '',
	managerList: [],

	email: '',
};

export const initTask: TaskDTO = {
	title: '',
	description: '',
	startDate: '',
	endDate: '',
	reportedBy: [],
	reportingManager: {} as UserDTO,
	status: '',
	projectId: {} as ProjectDTO,
	priority: '',
	_id: '',
};

export const initUser: UserDTO = {
	name: '',
	email: '',
	designation: '',
	role: '',
	date_of_birth: dayjs().subtract(15, 'years').format('YYYY/MM/DD'),
	department: '',
	userStatus: 'ACTIVE',
};
