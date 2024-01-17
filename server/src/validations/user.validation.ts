import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRoleEnum, UserStatusEnum } from '../Interfaces/general.enum';

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
	@IsEnum(UserRoleEnum)
	@IsNotEmpty()
	role!: string;

	@IsNotEmpty()
	@IsString()
	@IsEnum(UserStatusEnum)
	@IsNotEmpty()
	userStatus!: string;
}
