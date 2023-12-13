import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
