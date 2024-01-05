import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RoleEnum } from '../Interfaces/general.enum';

export class SignUpValidation {
	@IsNotEmpty()
	@IsString()
	name!: string;

	@IsNotEmpty()
	@IsEmail()
	email!: string;

	@IsNotEmpty()
	@IsString()
	password!: string;

	@IsNotEmpty()
	@IsString()
	designation!: string;

	@IsNotEmpty()
	@IsString()
	@IsEnum(RoleEnum)
	@IsNotEmpty()
	role!: string;
}

export class LoginValidation {
	@IsNotEmpty()
	@IsEmail()
	email!: string;

	@IsNotEmpty()
	@IsString()
	password!: string;
}
