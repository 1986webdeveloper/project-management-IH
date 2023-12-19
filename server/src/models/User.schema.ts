import mongoose, { Schema } from 'mongoose';
import { UserInterface } from '../Interfaces/user.interface';
import { RoleEnum } from '../Interfaces/general.interface';

const User: Schema = new Schema(
	{
		name: { type: String },
		email: { type: String, unique: true },
		password: { type: String },
		designation: { type: String },
		role: { type: String, enum: RoleEnum },
	},
	{ versionKey: false },
);

export default mongoose.model<UserInterface>('User', User);
