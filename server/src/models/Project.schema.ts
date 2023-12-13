import mongoose, { Schema, Types } from 'mongoose';
import { PriorityEnum, ProjectInterface, StatusEnum } from '../Interfaces/project.interface';

const Project: Schema = new Schema({
	projectName: { type: String, required: true },
	startDate: { type: String, required: true },
	estimatedHours: { type: Number, required: true },
	status: { type: String, enum: StatusEnum, required: true },
	deadlineDate: { type: String, required: true },
	assignedEmployee: { type: String, required: true },
	technologyList: { type: [String], required: true },
	priority: { type: String, enum: PriorityEnum, required: true },
	clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	profile: { type: String },
});

export default mongoose.model<ProjectInterface>('Project', Project);
