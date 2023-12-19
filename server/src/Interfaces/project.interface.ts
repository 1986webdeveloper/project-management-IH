import { Types } from 'mongoose';
import { StatusEnum } from './general.interface';

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
	_id?: Types.ObjectId;
}
