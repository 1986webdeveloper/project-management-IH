import mongoose, { Schema } from 'mongoose';
import { TaskInterface } from '../Interfaces/task.interface';

const Task: Schema = new Schema(
	{
		title: { type: String },
		description: { type: String },
		startDate: { type: String },
		endDate: { type: String },
		reportedBy: { type: [mongoose.Schema.Types.ObjectId], ref: 'User' },
		reportingManager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		status: { type: String },
		priority: { type: String },
		projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
	},
	{ timestamps: true, versionKey: false },
);

export default mongoose.model<TaskInterface>('Task', Task);
