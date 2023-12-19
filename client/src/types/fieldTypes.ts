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
	managerList: string[];
	_id: string;
}

export interface TaskDTO {
	title: string;
	description: string;
	startDate: string;
	endDate: string;
	reportedBy: string;
	reportingManager: string;
	assignee: string;
	status: string;
	projectName: string;
	priority: string;
	_id: string;
}
