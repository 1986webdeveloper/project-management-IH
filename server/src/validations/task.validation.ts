import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { PriorityEnum, StatusEnum } from '../Interfaces/general.interface';

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

	@IsString()
	@IsNotEmpty()
	reportedBy: string;

	@IsString()
	@IsNotEmpty()
	reportingManager: string;

	@IsString()
	@IsNotEmpty()
	assignee: string;

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
	projectName: Types.ObjectId;
}
