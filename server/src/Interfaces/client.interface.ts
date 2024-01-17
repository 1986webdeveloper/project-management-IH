import { Types } from 'mongoose';

export interface ClientInterface {
	clientName: string;
	onBoardingDate: string;
	industry: string;
	managerList: string[];
	email: string;
	client_picture: string;

	_id?: Types.ObjectId;
}
