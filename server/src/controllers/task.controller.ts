import { Request, Response } from 'express';
import { CreateTaskValidation } from '../validations/task.validation';
import { errorResponseHelper, successResponseHelper } from '../helpers/response.helper';
import { checkValidation } from '../helpers/validation.helper';
import { TaskService } from '../services/task.service';
import { TaskInterface } from '../Interfaces/task.interface';

export default class TaskController {
	protected readonly CreateTask = async (req: Request, res: Response) => {
		try {
			const payload: CreateTaskValidation = req.body;
			const validObj = new CreateTaskValidation();
			Object.assign(validObj, payload);
			const _errMessage = await checkValidation(validObj);
			if (_errMessage) {
				return res.status(422).json(errorResponseHelper({ message: _errMessage, status: 'Error', statusCode: 422 }));
			}
			const task: TaskInterface | null = await TaskService.createTask(payload);
			if (task) {
				return res.status(201).json(
					successResponseHelper({
						message: 'Task data saved Successfully',
						status: 'Success',
						statusCode: 201,
						data: { ...payload, _id: task._id },
					}),
				);
			} else {
				return res
					.status(400)
					.json(errorResponseHelper({ message: 'Cannot save task data', status: 'Error', statusCode: 400 }));
			}
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json(errorResponseHelper({ message: 'Something went wrong.', status: 'Error', statusCode: 500, error }));
		}
	};

	protected readonly GetTasks = async (req: Request, res: Response) => {
		try {
			const taskId = req.params.id;
			if (!taskId) {
				const tasks: TaskInterface[] = await TaskService.getTasks();
				return res.status(200).json(
					successResponseHelper({
						message: 'Task list fetched Successfully',
						status: 'Success',
						statusCode: 200,
						data: tasks,
					}),
				);
			} else {
				const task = await TaskService.getTaskById(taskId);

				return res.status(200).json(
					successResponseHelper({
						message: 'Task fetched Successfully',
						status: 'Success',
						statusCode: 200,
						data: task,
					}),
				);
			}
		} catch (error) {
			return res
				.status(500)
				.json(errorResponseHelper({ message: 'Something went wrong.', status: 'Error', statusCode: 500, error }));
		}
	};

	protected readonly UpdateTasks = async (req: Request, res: Response) => {
		try {
			const taskId: string = req.params.id;
			const payload = req.body;
			const task = await TaskService.getTaskById(taskId);
			if (!taskId && !task) {
				return res
					.status(400)
					.json(errorResponseHelper({ message: 'No task found', status: 'Error', statusCode: 400 }));
			}
			const updatedTask = await TaskService.updateTasks(taskId, payload);
			if (!updatedTask) {
				return res
					.status(400)
					.json(errorResponseHelper({ message: 'Task data is not valid', status: 'Error', statusCode: 400 }));
			}

			return res.status(200).json(
				successResponseHelper({
					message: 'Task data updated Successfully',
					status: 'Success',
					statusCode: 200,
					data: updatedTask,
				}),
			);
		} catch (error) {
			return res
				.status(500)
				.json(errorResponseHelper({ message: 'Something went wrong.', status: 'Error', statusCode: 500, error }));
		}
	};

	protected readonly DeleteTask = async (req: Request, res: Response) => {
		try {
			const taskId: string = req.params.id;
			if (!taskId) {
				return res
					.status(400)
					.json(errorResponseHelper({ message: 'No Task found', status: 'Error', statusCode: 400 }));
			}
			const isDeleted = await TaskService.deleteTask(taskId);
			if (isDeleted) {
				return res.status(200).json(
					successResponseHelper({
						message: 'Task deleted Successfully',
						status: 'Success',
						statusCode: 200,
					}),
				);
			} else {
				return res
					.status(404)
					.json(errorResponseHelper({ message: 'No Task found to delete', status: 'Error', statusCode: 404 }));
			}
		} catch (error) {
			return res
				.status(500)
				.json(errorResponseHelper({ message: 'Something went wrong.', status: 'Error', statusCode: 500, error }));
		}
	};
}
