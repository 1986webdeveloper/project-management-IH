import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { PriorityEnum, StatusEnum } from '../Interfaces/general.enum';
import { UserInterface } from '../Interfaces/user.interface';
import { ProjectInterface } from '../Interfaces/project.interface';

export class CreateTaskValidation {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsString()
	@IsNotEmpty()
	startDate: string;

	@IsString()
	@IsNotEmpty()
	endDate: string;

	@IsArray()
	@IsNotEmpty()
	reportedBy: UserInterface[];

	@IsString()
	@IsNotEmpty()
	reportingManager: UserInterface;

	@IsString()
	@IsNotEmpty()
	@IsEnum(StatusEnum)
	@IsNotEmpty()
	status: string;

	@IsString()
	@IsNotEmpty()
	@IsEnum(PriorityEnum)
	@IsNotEmpty()
	priority: string;

	@IsString()
	@IsNotEmpty()
	projectId: ProjectInterface;
}
