import { ClientDTO, ProjectDTO, TaskDTO } from '@/types/fieldTypes';

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

export const initProject: ProjectDTO = {
	projectName: '',
	startDate: '',
	estimatedHours: 0,
	status: '',
	deadlineDate: '',
	assignedEmployee: '',
	technologyList: [],
	priority: '',
	clientId: '6571b5200b544c626e7d46a9',
	profile: '',
	_id: '',
};

export const initClient: ClientDTO = {
	clientName: '',
	onBoardingDate: '',
	industry: '',
	manager: '',
	_id: '',
};

export const initTask: TaskDTO = {
	title: '',
	description: '',
	startDate: '',
	endDate: '',
	reportedBy: '',
	reportingManager: '',
	assignee: '',
	status: '',
	projectName: '657afe9d4879fe1e49cbeeda',
	priority: '',
	_id: '',
};
