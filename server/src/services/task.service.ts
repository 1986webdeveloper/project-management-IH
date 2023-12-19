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
			assignee: taskDetails.assignee,
			status: taskDetails.status,
			priority: taskDetails.priority,
			projectId: taskDetails.projectName,
		});

		if (Task) {
			console.log(Task);
			Task.save();
			return Task;
		}
	};

	getTasks = async () => {
		const TaskList = await TaskSchema.find();
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
})();
