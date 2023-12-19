import mongoose, { Schema, Types } from 'mongoose';
import { StatusEnum, PriorityEnum } from '../Interfaces/general.interface';
import { ProjectInterface } from '../Interfaces/project.interface';

const Project: Schema = new Schema({
	projectName: { type: String },
	startDate: { type: String },
	estimatedHours: { type: Number },
	status: { type: String, enum: StatusEnum },
	deadlineDate: { type: String },
	assignedEmployee: { type: String },
	technologyList: { type: [String] },
	priority: { type: String, enum: PriorityEnum },
	clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	profile: { type: String },
});

export default mongoose.model<ProjectInterface>('Project', Project);
