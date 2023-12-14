import { Types } from 'mongoose';

export interface ClientInterface {
	clientName: string;
	onBoardingDate: string;
	industry: string;
	manager: string;
	_id?: Types.ObjectId;
}
