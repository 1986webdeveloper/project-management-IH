import { Document, Types } from 'mongoose';
import { UserRoleEnum, UserStatusEnum } from './general.enum';

export interface UserInterface extends Document {
	name: string;
	email: string;
	password: string;
	designation: string;
	role: UserRoleEnum;
	profile_Picture: any;
	date_of_birth: string;
	department: string;
	userStatus: UserStatusEnum;
	_id?: Types.ObjectId;
}
