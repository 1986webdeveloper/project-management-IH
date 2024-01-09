import { Request, Response } from 'express';
import { decryptAndVerifyToken } from '../helpers/token.helper';
import { UserService } from '../services/user.service';
import { RoleEnum } from '../Interfaces/general.enum';
import User from '../routes/user.routes';
import { UserInterface } from '../Interfaces/user.interface';
import { ProjectService } from '../services/project.service';
import { ClientService } from '../services/client.service';
import { TaskService } from '../services/task.service';
import { AllCollectionInterface } from '../Interfaces/global.interface';
import { errorResponseHelper, successResponseHelper } from '../helpers/response.helper';

export default class GlobalController {
	protected readonly GetAllData = async (req: Request, res: Response) => {
		try {
			const token = req.headers['authorization'].split(' ')[1];
			const tokenUser = decryptAndVerifyToken(token);
			if (typeof tokenUser !== 'string') {
				const user = await UserService.getUserByEmail(tokenUser?.email);
				const usersList: UserInterface[] = await UserService.getUserList();
				const filteredUserList = usersList.filter(x => x.email !== user.email);
				let allData: AllCollectionInterface = {};

				if (user.role === RoleEnum.ADMIN) {
					const data = {
						users: filteredUserList,
						projects: await ProjectService.getProjects(),
						clients: await ClientService.getClients(),
						tasks: await TaskService.getTasks(),
					};
					allData = data;
				}
				if (user.role === RoleEnum.MANAGER) {
					const data = {
						users: filteredUserList,
						projects: await ProjectService.getProjects(),
						clients: await ClientService.getClients(),
						tasks: await TaskService.getTasks(),
					};
					allData = data;
				}
				if (user.role === RoleEnum.EMPLOYEE) {
					const data = {
						users: filteredUserList,
						projects: await ProjectService.getProjects(),
						tasks: await TaskService.getTasks(),
					};
					allData = data;
				}
				return res.status(200).json(
					successResponseHelper({
						message: 'Data fetched Successfully',
						status: 'Success',
						statusCode: 200,
						data: allData,
					}),
				);
			} else {
				return res.status(500).json(errorResponseHelper({ message: 'Wrong Token', status: 'Error', statusCode: 500 }));
			}
		} catch (error) {
			return res
				.status(500)
				.json(errorResponseHelper({ message: 'Something went wrong.', status: 'Error', statusCode: 500, error }));
		}
	};
}
