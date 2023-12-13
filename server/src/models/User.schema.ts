import mongoose, { Schema } from 'mongoose';
import { RoleEnum, UserInterface } from '../Interfaces/user.interface';

const User: Schema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		designation: { type: String, required: true },
		role: { type: String, enum: RoleEnum, required: true },
	},
	{ versionKey: false },
);

export default mongoose.model<UserInterface>('User', User);
