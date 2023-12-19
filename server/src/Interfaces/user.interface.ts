import { Document } from 'mongoose';
import { RoleEnum } from './general.interface';

export interface UserInterface extends Document {
	name: string;
	email: string;
	password: string;
	designation: string;
	role: RoleEnum;
}
