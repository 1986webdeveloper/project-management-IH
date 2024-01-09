import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RoleEnum } from '../Interfaces/general.enum';

export class UserValidation {
	@IsNotEmpty()
	@IsString()
	name!: string;

	@IsNotEmpty()
	@IsEmail()
	email!: string;

	@IsNotEmpty()
	@IsString()
	designation!: string;

	@IsNotEmpty()
	@IsString()
	date_of_birth!: string;

	@IsNotEmpty()
	@IsString()
	department!: string;

	@IsNotEmpty()
	@IsString()
	profile_Picture!: string;

	@IsNotEmpty()
	@IsString()
	@IsEnum(RoleEnum)
	@IsNotEmpty()
	role!: string;
}
