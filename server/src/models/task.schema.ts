import mongoose, { Schema } from 'mongoose';
import { TaskInterface } from '../Interfaces/task.interface';

const Task: Schema = new Schema({
	title: { type: String },
	description: { type: String },
	startDate: { type: String },
	endDate: { type: String },
	reportedBy: { type: String },
	reportingManager: { type: String },
	status: { type: String },
	priority: { type: String },
	projectName: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
});

export default mongoose.model<TaskInterface>('Task', Task);
