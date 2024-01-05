import { Types } from 'mongoose';

export interface TaskInterface {
	title: string;
	description: string;
	startDate: string;
	endDate: string;
	reportedBy: string;
	reportingManager: string;

	status: string;
	priority: string;
	projectName: Types.ObjectId;
	_id?: string;
}
