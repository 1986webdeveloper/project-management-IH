import TaskSchema from '../models/task.schema';
import { TaskInterface } from '../Interfaces/task.interface';

export const TaskService = new (class {
	constructor() {}

	createTask = async (taskDetails: TaskInterface) => {
		const Task = await TaskSchema.create({
			title: taskDetails.title,
			description: taskDetails.description,
			startDate: taskDetails.startDate,
			endDate: taskDetails.endDate,
			reportedBy: taskDetails.reportedBy,
			reportingManager: taskDetails.reportingManager,
			status: taskDetails.status,
			priority: taskDetails.priority,
			projectId: taskDetails.projectId,
		});

		if (Task) {
			Task.save();
			return Task;
		}
	};

	getTasks = async () => {
		const TaskList = await TaskSchema.find().populate([
			{
				path: 'reportedBy',
				select: '-password',
			},
			{
				path: 'reportingManager',
				select: '-password',
			},
			{
				path: 'projectId',
			},
		]);
		return TaskList;
	};

	updateTasks = async (TaskId: string, data: any) => {
		let updatedTask = await TaskSchema.findByIdAndUpdate(TaskId, data, { returnDocument: 'after' }).exec();
		return updatedTask;
	};

	deleteTask = async (TaskId: string) => {
		let deletedTask = await TaskSchema.findByIdAndDelete(TaskId).exec();
		return deletedTask;
	};

	getTaskById = async (TaskId: string) => {
		const Task = await TaskSchema.findById(TaskId).exec();
		return Task;
	};

	getTaskReportedBy = async (reportedBy: string) => {
		const Task = await TaskSchema.find({ reportedBy: { $in: [reportedBy] } })
			.populate([
				{
					path: 'reportedBy',
					select: '-password',
				},
				{
					path: 'reportingManager',
					select: '-password',
				},
				{
					path: 'projectId',
				},
			])
			.exec();
		return Task;
	};

	getTasksByReportingManager = async (reportingManager: string) => {
		const Task = await TaskSchema.find({ reportingManager })
			.populate([
				{
					path: 'reportedBy',
					select: '-password',
				},
				{
					path: 'reportingManager',
					select: '-password',
				},
				{
					path: 'projectId',
				},
			])
			.exec();
		return Task;
	};
})();
