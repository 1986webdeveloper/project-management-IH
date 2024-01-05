import { Document, Types } from 'mongoose';
import { RoleEnum } from './general.enum';

export interface UserInterface extends Document {
	name: string;
	email: string;
	password: string;
	designation: string;
	role: RoleEnum;
	_id?: Types.ObjectId;
}
