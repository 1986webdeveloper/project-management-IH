import { IsNotEmpty, IsString } from 'class-validator';

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

	@IsString()
	@IsNotEmpty()
	manager: string;
}
