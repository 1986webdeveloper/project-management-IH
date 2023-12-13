import {
	IsArray,
	IsEnum,
	IsMongoId,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';
import { StatusEnum } from '../Interfaces/project.interface';

export class ProjectTechnology {
	@IsString()
	@IsNotEmpty()
	technology: string;
}

export class CreateProjectValidation {
	@IsString()
	@IsNotEmpty()
	projectName: string;

	@IsString()
	@IsNotEmpty()
	startDate: string;

	@IsOptional()
	@IsNumber({ maxDecimalPlaces: 0 })
	estimatedHours: number;

	@IsEnum(StatusEnum)
	@IsNotEmpty()
	status: StatusEnum;

	@IsString()
	@IsNotEmpty()
	deadlineDate: string;

	@IsString()
	@IsNotEmpty()
	assignedEmployee: string;

	@IsArray()
	@ValidateNested({ each: true })
	technologyList: ProjectTechnology[];

	@IsString()
	@IsNotEmpty()
	priority: string;

	@IsMongoId()
	@IsNotEmpty()
	clientId: Types.ObjectId;

	@IsString()
	@IsNotEmpty()
	profile: string;
}
