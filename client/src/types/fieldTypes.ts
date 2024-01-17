import { UserDTO } from './auth.types';

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
	reportingManager: any;
	technologyList: string[];
	priority: string;
	clientId: any;
	_id?: string;
}

export interface ClientDTO {
	clientName: string;
	email: string;
	onBoardingDate: string;
	industry: string;
	managerList: UserDTO[];
	client_picture?: string;
	_id?: string;
}

export interface TaskDTO {
	title: string;
	description: string;
	startDate: string;
	endDate: string;
	reportedBy: UserDTO[];
	reportingManager: any;
	status: string;
	projectId: any;
	priority: string;
	_id: string;
}
