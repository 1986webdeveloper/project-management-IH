import { Types } from 'mongoose';

export interface TaskInterface {
	title: string;
	description: string;
	startDate: Date;
	endDate: Date;
	reportedBy: string;
	reportingManager: string;
	assignee: string;
	status: string;
	priority: string;
	projectId: Types.ObjectId;
}
