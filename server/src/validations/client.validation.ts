import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Types } from 'mongoose';

export class CreateClientValidation {
	@IsString()
	@IsNotEmpty()
	clientName: string;

	@IsString()
	@IsNotEmpty()
	onBoardingDate: string;

	@IsString()
	@IsNotEmpty()
	industry: string;

	@IsArray()
	@ValidateNested({ each: true })
	managerList: [];
}
