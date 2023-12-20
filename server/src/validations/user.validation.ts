import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RoleEnum } from '../Interfaces/general.interface';

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
	@IsEnum(RoleEnum)
	@IsNotEmpty()
	role!: string;
}
