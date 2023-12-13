import { Types } from 'mongoose';

export enum StatusEnum {
	COMPLETED = 'COMPLETED',
	IN_PROGRESS = 'IN_PROGRESS',
	HOLD = 'HOLD',
}

export enum PriorityEnum {
	HIGH = 'HIGH',
	LOW = 'LOW',
	MEDIUM = 'MEDIUM',
}

export interface ProjectInterface {
	projectName: string;
	startDate: string;
	estimatedHours: number;
	status: StatusEnum;
	deadlineDate: string;
	assignedEmployee: string;
	technologyList: string[];
	priority: string;
	clientId: Types.ObjectId;
	profile: string;
}
