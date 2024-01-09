import { Types } from 'mongoose';
import { UserInterface } from './user.interface';
import { ProjectInterface } from './project.interface';

export interface TaskInterface {
	title: string;
	description: string;
	startDate: string;
	endDate: string;
	reportedBy: UserInterface[];
	reportingManager: UserInterface;

	status: string;
	priority: string;
	projectId: ProjectInterface;
	_id?: string;
}
