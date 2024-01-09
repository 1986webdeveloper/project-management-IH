import { Document, Types } from 'mongoose';
import { RoleEnum } from './general.enum';

export interface UserInterface extends Document {
	name: string;
	email: string;
	password: string;
	designation: string;
	role: RoleEnum;
	profile_Picture: any;
	date_of_birth: string;
	department: string;
	_id?: Types.ObjectId;
}
