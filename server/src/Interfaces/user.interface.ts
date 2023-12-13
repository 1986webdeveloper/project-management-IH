import { Document } from 'mongoose';

export enum RoleEnum {
	ADMIN = 'ADMIN',
	HR = 'HR',
	MANAGER = 'MANAGER',
	EMPLOYEE = 'EMPLOYEE',
}

export interface UserInterface extends Document {
	name: string;
	email: string;
	password: string;
	designation: string;
	role: RoleEnum;
}
