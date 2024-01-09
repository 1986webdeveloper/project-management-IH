import mongoose, { Schema } from 'mongoose';
import { UserInterface } from '../Interfaces/user.interface';
import { RoleEnum } from '../Interfaces/general.enum';

const User: Schema = new Schema(
	{
		name: { type: String },
		email: { type: String, unique: true },
		password: { type: String },
		designation: { type: String },
		role: { type: String, enum: RoleEnum },
		profile_Picture: { type: String },
		date_of_birth: { type: String },
		department: { type: String },
	},
	{ timestamps: true, versionKey: false },
);

export default mongoose.model<UserInterface>('User', User);
