import ClientSchema from '../models/Client.schema';

export const ClientService = new (class {
	constructor() {}

	createClient = async (clientData: any) => {
		const Client = await ClientSchema.create({
			clientName: clientData.clientName,
			onBoardingDate: clientData.onBoardingDate,
			industry: clientData.industry,
			manager: clientData.manager,
		});

		if (Client) {
			Client.save();
			return Client;
		}
	};

	getClients = async () => {
		const ClientList = await ClientSchema.find();
		return ClientList;
	};

	updateClient = async (ClientId: string, data: any) => {
		let updatedClient = await ClientSchema.findByIdAndUpdate(ClientId, data).exec();
		return updatedClient;
	};

	deleteClient = async (ClientId: string) => {
		let deletedClient = await ClientSchema.findByIdAndDelete(ClientId).exec();
		return deletedClient;
	};

	getClientById = async (ClientId: string) => {
		const Client = await ClientSchema.findById(ClientId).exec();
		return Client;
	};
})();
