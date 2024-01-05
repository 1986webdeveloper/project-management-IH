import { Types } from 'mongoose';
import { StatusEnum } from './general.enum';

export interface ProjectInterface {
	projectName: string;
	startDate: string;
	estimatedHours: number;
	status: StatusEnum;
	deadlineDate: string;
	assignedEmployeeList: string[];
	technologyList: string[];
	reportingManager: Types.ObjectId;
	priority: string;
	clientId: Types.ObjectId;
	_id?: Types.ObjectId;
}
