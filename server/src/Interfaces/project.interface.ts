import { Types } from 'mongoose';
import { StatusEnum } from './general.enum';
import { UserInterface } from './user.interface';
import { ClientInterface } from './client.interface';

export interface ProjectInterface {
	projectName: string;
	startDate: string;
	estimatedHours: number;
	status: StatusEnum;
	deadlineDate: string;
	assignedEmployeeList: UserInterface[];
	technologyList: string[];
	reportingManager: UserInterface;
	priority: string;
	clientId: ClientInterface;
	_id?: Types.ObjectId;
}
