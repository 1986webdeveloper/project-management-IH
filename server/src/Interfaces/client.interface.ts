import { Types } from 'mongoose';

export interface ClientInterface {
	clientName: string;
	onBoardingDate: string;
	industry: string;
	managerList: string[];
	_id?: Types.ObjectId;
}
