import { Request, Response } from 'express';
import { checkValidation } from '../helpers/validation.helper';
import { CreateClientValidation } from '../validations/client.validation';
import { errorResponseHelper, successResponseHelper } from '../helpers/response.helper';
import { ClientInterface } from '../Interfaces/client.interface';
import { ClientService } from '../services/client.service';

export default class ClientController {
	protected readonly CreateClient = async (req: Request, res: Response) => {
		try {
			const payload: CreateClientValidation = req.body;

			const validObj = new CreateClientValidation();
			Object.assign(validObj, payload);

			const _errMessage = await checkValidation(validObj);

			if (_errMessage) {
				return res.status(422).json(errorResponseHelper({ message: _errMessage, status: 'Error', statusCode: 422 }));
			}

			const client: ClientInterface | null = await ClientService.createClient(payload);

			if (client) {
				return res.status(201).json(
					successResponseHelper({
						message: 'Client data saved Successfully',
						status: 'Success',
						statusCode: 201,
						data: { ...payload, _id: client._id },
					}),
				);
			} else {
				return res
					.status(400)
					.json(errorResponseHelper({ message: 'Client data not found', status: 'Error', statusCode: 400 }));
			}
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json(errorResponseHelper({ message: 'Something went wrong.', status: 'Error', statusCode: 500, error }));
		}
	};

	protected readonly GetClient = async (req: Request, res: Response) => {
		try {
			const clientId = req.params.id;
			if (!clientId) {
				const clients: ClientInterface[] = await ClientService.getClients();

				return res.status(200).json(
					successResponseHelper({
						message: 'Client list fetched Successfully',
						status: 'Success',
						statusCode: 200,
						data: clients,
					}),
				);
			} else {
				const client = await ClientService.getClientById(clientId);
				return res.status(200).json(
					successResponseHelper({
						message: 'Client fetched Successfully',
						status: 'Success',
						statusCode: 200,
						data: client,
					}),
				);
			}
		} catch (error) {
			return res
				.status(500)
				.json(errorResponseHelper({ message: 'Something went wrong.', status: 'Error', statusCode: 500, error }));
		}
	};

	protected readonly UpdateClient = async (req: Request, res: Response) => {
		try {
			const clientId: string = req.params.id;
			const payload = req.body;

			const client = await ClientService.getClientById(clientId);
			if (!clientId && !client) {
				return res
					.status(400)
					.json(errorResponseHelper({ message: 'No Client found', status: 'Error', statusCode: 400 }));
			}

			const updatedClient = await ClientService.updateClient(clientId, payload);
			if (!updatedClient) {
				return res
					.status(400)
					.json(errorResponseHelper({ message: 'Client data is not valid', status: 'Error', statusCode: 400 }));
			}
			console.log('--------->', updatedClient);
			return res.status(200).json(
				successResponseHelper({
					message: 'Client data updated Successfully',
					status: 'Success',
					statusCode: 200,
					data: updatedClient,
				}),
			);
		} catch (error) {
			return res
				.status(500)
				.json(errorResponseHelper({ message: 'Something went wrong.', status: 'Error', statusCode: 500, error }));
		}
	};

	protected readonly DeleteClient = async (req: Request, res: Response) => {
		try {
			const clientId: string = req.params.id;
			if (!clientId) {
				return res
					.status(400)
					.json(errorResponseHelper({ message: 'No Client found', status: 'Error', statusCode: 400 }));
			}

			const isDeleted = await ClientService.deleteClient(clientId);

			if (isDeleted) {
				return res.status(200).json(
					successResponseHelper({
						message: 'Client deleted Successfully',
						status: 'Success',
						statusCode: 200,
					}),
				);
			} else {
				return res
					.status(404)
					.json(errorResponseHelper({ message: 'No Client found to delete', status: 'Error', statusCode: 404 }));
			}
		} catch (error) {
			return res
				.status(500)
				.json(errorResponseHelper({ message: 'Something went wrong.', status: 'Error', statusCode: 500, error }));
		}
	};
}
