import mongoose, { Schema, Types } from 'mongoose';
import { StatusEnum, PriorityEnum } from '../Interfaces/general.enum';
import { ProjectInterface } from '../Interfaces/project.interface';

const Project: Schema = new Schema(
	{
		projectName: { type: String },
		startDate: { type: String },
		estimatedHours: { type: Number },
		status: { type: String, enum: StatusEnum },
		deadlineDate: { type: String },
		assignedEmployeeList: { type: [mongoose.Schema.Types.ObjectId], ref: 'User' },
		technologyList: { type: [String] },
		reportingManager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		priority: { type: String, enum: PriorityEnum },
		clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
	},
	{ timestamps: true, versionKey: false },
);

export default mongoose.model<ProjectInterface>('Project', Project);
