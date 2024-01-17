import { ClientInterface } from '../Interfaces/client.interface';
import ClientSchema from '../models/Client.schema';

export const ClientService = new (class {
	constructor() {}

	createClient = async (clientData: ClientInterface) => {
		const Client = await ClientSchema.create({
			clientName: clientData.clientName,
			onBoardingDate: clientData.onBoardingDate,
			industry: clientData.industry,
			managerList: clientData.managerList,
			email: clientData.email,
			client_picture: clientData.client_picture,
		});

		if (Client) {
			console.log(Client);
			Client.save();
			return Client;
		}
	};

	getClients = async () => {
		const ClientList = await ClientSchema.find().populate({
			path: 'managerList',
			select: '-password',
		});
		return ClientList;
	};

	updateClient = async (ClientId: string, data: any) => {
		let updatedClient = await ClientSchema.findByIdAndUpdate(ClientId, data, { returnDocument: 'after' }).exec();
		return updatedClient;
	};

	deleteClient = async (ClientId: string) => {
		let deletedClient = await ClientSchema.findByIdAndDelete(ClientId).exec();
		return deletedClient;
	};

	getClientByEmail = async (email: string) => {
		const Client = await ClientSchema.findOne({ email }).exec();
		return Client;
	};

	getClientById = async (ClientId: string) => {
		const Client = await ClientSchema.findById(ClientId).exec();
		return Client;
	};
})();
