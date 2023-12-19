import { Request, Response } from 'express';
import { ProjectInterface } from '../Interfaces/project.interface';
import { ProjectService } from '../services/project.service';
import { errorResponseHelper, successResponseHelper } from '../helpers/response.helper';
import { CreateProjectValidation } from '../validations/project.validation';
import { checkValidation } from '../helpers/validation.helper';

export default class ProjectController {
	protected readonly CreateProject = async (req: Request, res: Response) => {
		try {
			const payload: CreateProjectValidation = req.body;
			const validObj = new CreateProjectValidation();
			Object.assign(validObj, payload);
			const _errMessage = await checkValidation(validObj);
			if (_errMessage) {
				return res.status(422).json(errorResponseHelper({ message: _errMessage, status: 'Error', statusCode: 422 }));
			}
			const project: ProjectInterface | null = await ProjectService.createProject(payload);
			if (project) {
				return res.status(201).json(
					successResponseHelper({
						message: 'Project data saved Successfully',
						status: 'Success',
						statusCode: 201,
						data: { ...payload, _id: project._id },
					}),
				);
			} else {
				return res
					.status(400)
					.json(errorResponseHelper({ message: 'Project data is not valid', status: 'Error', statusCode: 400 }));
			}
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json(errorResponseHelper({ message: 'Something went wrong.', status: 'Error', statusCode: 500, error }));
		}
	};

	protected readonly ProjectList = async (req: Request, res: Response) => {
		try {
			const projects: ProjectInterface[] = await ProjectService.getProjects();
			if (projects.length > 0) {
				return res.status(200).json(
					successResponseHelper({
						message: 'Project list fetched Successfully',
						status: 'Success',
						statusCode: 200,
						data: projects,
					}),
				);
			} else {
				return res
					.status(404)
					.json(errorResponseHelper({ message: 'No project found', status: 'Error', statusCode: 404 }));
			}
		} catch (error) {
			return res
				.status(500)
				.json(errorResponseHelper({ message: 'Something went wrong.', status: 'Error', statusCode: 500, error }));
		}
	};

	protected readonly UpdateProject = async (req: Request, res: Response) => {
		try {
			const projectId: string = req.params._id;
			const payload = req.body;
			const isAvailable = await ProjectService.isProjectAvailable(projectId);
			if (!projectId && !isAvailable) {
				return res
					.status(400)
					.json(errorResponseHelper({ message: 'No Project found', status: 'Error', statusCode: 400 }));
			}
			const updatedProject = await ProjectService.updateProject(projectId, payload);
			if (updatedProject) {
				return res.status(200).json(
					successResponseHelper({
						message: 'Project data updated Successfully',
						status: 'Success',
						statusCode: 200,
						data: payload,
					}),
				);
			} else {
				return res
					.status(400)
					.json(errorResponseHelper({ message: 'Project data is not valid', status: 'Error', statusCode: 400 }));
			}
		} catch (error) {
			return res
				.status(500)
				.json(errorResponseHelper({ message: 'Something went wrong.', status: 'Error', statusCode: 500, error }));
		}
	};

	protected readonly DeleteProject = async (req: Request, res: Response) => {
		try {
			const projectId: string = req.params._id;

			if (!projectId) {
				return res
					.status(400)
					.json(errorResponseHelper({ message: 'No Project found', status: 'Error', statusCode: 400 }));
			}
			const isDeleted = await ProjectService.deleteProject(projectId);
			if (isDeleted) {
				return res.status(200).json(
					successResponseHelper({
						message: 'Project deleted Successfully',
						status: 'Success',
						statusCode: 200,
					}),
				);
			} else {
				return res
					.status(404)
					.json(errorResponseHelper({ message: 'No project found to delete', status: 'Error', statusCode: 404 }));
			}
		} catch (error) {
			return res
				.status(500)
				.json(errorResponseHelper({ message: 'Something went wrong.', status: 'Error', statusCode: 500, error }));
		}
	};
}
